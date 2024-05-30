<script setup lang="ts" generic="TValue extends string, TOption extends object">
// INTERFACES
import { onClickOutside, useElementBounding, useWindowSize } from '@vueuse/core'
import { type CSSProperties, ref, watch } from 'vue'
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon'
import VTransitionFade from '@/components/VTransitionFade.vue'

type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: any
}

interface Props<TOption, TValue> {
  modelValue: TOption | undefined
  label?: string
  options: Array<TOption>
  nameField: KeyOfType<TOption, string>
  valueField: KeyOfType<TOption, TValue>
  placeholder?: string
}

const props = withDefaults(defineProps<Props<TOption, TValue>>(), {
  placeholder: 'Выберите...',
})
defineEmits<{
  (e: 'update:modelValue', value: TOption | undefined): void
}>()

// CONSTANTS
const MARGIN_BETWEEN_BUTTON_AND_DROPDOWN = 8
const MARGIN_BETWEEN_DROPDOWN_AND_WINDOW = 16
const DROPDOWN_MAX_HEIGHT = 300

// REFS
const listBoxButtonRef = ref<HTMLElement>()
const listboxDropdownRef = ref<HTMLElement>()

// VARIABLES
const listboxValue = defineModel<TOption>()

const isOpen = ref(false)
const dropdownStyles = ref<CSSProperties>({})
const buttonBounding = useElementBounding(listBoxButtonRef)
const { height: windowHeight } = useWindowSize()

// WATCHERS
watch(isOpen, () => {
  dropdownStyles.value = getDrowdownStyles()
})

watch(buttonBounding.y, () => {
  dropdownStyles.value = getDrowdownStyles()
})

// METHODS
function getOptionName(option: TOption): string {
  return option[props.nameField] as string
}

function getOptionValue(option: TOption): string {
  return option[props.valueField] as string
}

function toggleListboxDropdown(): void {
  isOpen.value = !isOpen.value
}

function getDrowdownStyles(): CSSProperties {
  const dropdownNeededHeight = MARGIN_BETWEEN_BUTTON_AND_DROPDOWN + DROPDOWN_MAX_HEIGHT + MARGIN_BETWEEN_DROPDOWN_AND_WINDOW
  const buttonEndPosition = buttonBounding.y.value + buttonBounding.height.value

  const canRenderDropdownBelowButton = buttonEndPosition + dropdownNeededHeight < windowHeight.value

  if (canRenderDropdownBelowButton) {
    return getDropdownStylesBelowButton()
  }
  else {
    return getDropdownStylesAboveButton()
  }
}

function getDropdownStylesAboveButton(): CSSProperties {
  const bottom = windowHeight.value
    - buttonBounding.y.value
    - buttonBounding.height.value
    + MARGIN_BETWEEN_BUTTON_AND_DROPDOWN

  return {
    bottom: `${bottom}px`,
    left: `${buttonBounding.left.value}px`,
    width: `${buttonBounding.width.value}px`,
  }
}

function getDropdownStylesBelowButton(): CSSProperties {
  const top = buttonBounding.y.value
    + buttonBounding.height.value
    + MARGIN_BETWEEN_BUTTON_AND_DROPDOWN

  return {
    top: `${top}px`,
    left: `${buttonBounding.left.value}px`,
    width: `${buttonBounding.width.value}px`,
  }
}

function isSelected(option: TOption): boolean {
  return !!listboxValue.value && getOptionValue(option) === getOptionValue(listboxValue.value)
}

function onOptionClick(option: TOption): void {
  listboxValue.value = option
  closeDropdown()
}

function closeDropdown(): void {
  isOpen.value = false
}

// HOOKS
onClickOutside(listboxDropdownRef, () => {
  closeDropdown()
}, { ignore: [listBoxButtonRef] })
</script>

<template>
  <div class="listbox">
    <span
      class="listbox__label"
    >
      {{ label }}
    </span>
    <button
      ref="listBoxButtonRef"
      type="button"
      class="listbox__button"
      @click="toggleListboxDropdown"
    >
      <span
        class="listbox__button__content"
        :class="{ 'listbox__button__content--empty': !listboxValue }"
      >
        {{ listboxValue ? getOptionName(listboxValue) : placeholder }}
      </span>
      <ChevronDownIcon
        class="listbox__button__icon"
        :class="{ 'listbox__button__icon--dropdown_opened': isOpen }"
      />
    </button>
    <!--  DROPDOWN  -->
    <teleport to="#dropdownOverlay">
      <VTransitionFade>
        <div
          v-if="isOpen"
          ref="listboxDropdownRef"
          class="listbox__dropdown"
          :style="[
            dropdownStyles,
            { maxHeight: `${DROPDOWN_MAX_HEIGHT}px` },
          ]"
        >
          <ul class="listbox__dropdown__list">
            <li
              v-for="(option, index) of options" :key="index"
              class="listbox__dropdown__list__item"
              :class="{ 'listbox__dropdown__list__item--selected': isSelected(option) }"
              @click="onOptionClick(option)"
            >
              {{ getOptionName(option) }}
            </li>
          </ul>
        </div>
      </VTransitionFade>
    </teleport>
  </div>
</template>

<style scoped>
.listbox {
  display: flex;
  flex-direction: column;
}

.listbox__label {
  margin-left: 16px;
  margin-bottom: 6px;
  color: #4F4F4F;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.listbox__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px 10px 16px;
  border: none;
  background: #F2F2F2;
  height: 40px;
  width: 288px;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

.listbox__button:hover {
  background: #E0E0E0;
}

.listbox__button__content {
  color: #000000;
  line-height: 21px;
  font-size: 14px;
  font-weight: 400;
}

.listbox__button__content--empty {
  color: #878787;
}

/* Broken SVG */
.listbox__button__icon {
  width: 24px;
  height: 12px;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.listbox__button__icon--dropdown_opened {
  transform: rotate(180deg);
}

.listbox__dropdown {
  position: fixed;
  width: 288px;
  padding: 8px 0;
  background: #F2F2F2;
  overflow: auto;
}

.listbox__dropdown__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.listbox__dropdown__list__item {
  padding: 8px 16px;
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  cursor: pointer;
  transition: 200ms ease-in-out;
}

.listbox__dropdown__list__item--selected {
  background: #d3d3d3;
}

.listbox__dropdown__list__item:hover {
  background: #E0E0E0;
}
</style>
