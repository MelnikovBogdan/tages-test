import { createElementBlock, createElementVNode, openBlock } from 'vue'

export default function ChevronDownIcon() {
  return (openBlock(), createElementBlock('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 18 11',
    width: '18',
    height: '11',
  }, [
    createElementVNode('path', {
      'fill-rule': 'evenodd',
      'clip-rule': 'evenodd',
      'd': 'M16.2929 0.292908L17.7071 1.70712L9.00001 10.4142L0.292908 1.70712L1.70712 0.292908L9.00001 7.5858L16.2929 0.292908Z',
      'fill': 'black',
    }),
  ]))
}
