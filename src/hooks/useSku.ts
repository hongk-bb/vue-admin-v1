import { nextTick, ref } from 'vue'
import { useGoodsStore } from '@/stores/goods'
import { useArrayMoveUp, useArrayMoveDown } from '@/utils/util'
const goodsStore = useGoodsStore()

// 当前商品ID
export const goodsId = ref<any>(0)

// 规格选项列表
export const sku_card_list = ref<any>([])

// 初始化规格选项列表
export function initSkuCardList(d: any) {
  sku_card_list.value = d.goodsSkusCard.map((item: any) => {
    item.text = item.name
    item.loading = false
    item.goodsSkusCardValue.map((v: any) => {
      v.text = v.value || '属性值'
      return v
    })
    return item
  })
}

// 添加规格选项
export const btnLoading = ref(false)
export function addSkuCardEvent() {
  btnLoading.value = true
  goodsStore
    .createGoodsSkusCardAction({
      goods_id: goodsId.value,
      name: '规格选项',
      order: 50,
      type: 0
    })
    .then((res: any) => {
      sku_card_list.value.push({
        ...res,
        text: res.name,
        loading: false,
        goodsSkusCardValue: []
      })
    })
    .finally(() => {
      btnLoading.value = false
    })
}

// 修改规格选项
export function handleUpdate(item: any) {
  item.loading = true
  goodsStore
    .updateGoodsSkusCardAction(item.id, {
      goods_id: item.goods_id,
      name: item.text,
      order: item.order,
      type: 0
    })
    .then(res => {
      item.name = item.text
    })
    .catch(err => {
      item.text = item.name
    })
    .finally(() => {
      item.loading = false
    })
}

// 删除规格选项
export function handleDelete(item: any) {
  item.loading = true
  goodsStore.deleteGoodsSkusCardAction(item.id).then(res => {
    const i = sku_card_list.value.findIndex((o: any) => o.id == item.id)
    if (i != -1) {
      sku_card_list.value.splice(i, 1)
    }
  })
}

// 排序规格选项
export const bodyLoading = ref(false)
export function sortCard(action: any, index: number) {
  let oList = JSON.parse(JSON.stringify(sku_card_list.value))
  let func = action == 'up' ? useArrayMoveUp : useArrayMoveDown
  func(oList, index)
  let sortData = oList.map((o: any, i: number) => {
    return {
      id: o.id,
      order: i + 1
    }
  })
  bodyLoading.value = true
  goodsStore
    .sortGoodsSkusCardAction({
      sortdata: sortData
    })
    .then(res => {
      func(sku_card_list.value, index)
    })
    .finally(() => {
      bodyLoading.value = false
    })
}

// 初始化规格的值
export function initSkusCardItem(id: number) {
  const item = sku_card_list.value.find((o: any) => o.id == id)

  const inputValue = ref('')
  const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
  const inputVisible = ref(false)
  const InputRef = ref()

  const handleClose = (tag: any) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value.input.focus()
    })
  }

  const handleInputConfirm = () => {
    if (inputValue.value) {
      dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
  }

  return {
    item,
    inputValue,
    inputVisible,
    InputRef,
    handleClose,
    showInput,
    handleInputConfirm
  }
}
