import { computed, nextTick, ref } from 'vue'
import { useGoodsStore } from '@/stores/goods'
import {
  useArrayMoveUp,
  useArrayMoveDown,
  cartesianProductOf
} from '@/utils/util'
const goodsStore = useGoodsStore()

// 当前商品ID
export const goodsId = ref<any>(0)

// 规格选项列表
export const sku_card_list = ref<any>([])

export const sku_list = ref<any>([])

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

  sku_list.value = d.goodsSkus
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
    getTableData()
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
      getTableData()
    })
    .finally(() => {
      bodyLoading.value = false
    })
}

// 选择设置规格
export function handleChooseSetGoodsSkusCard(id: number, data: any) {
  let item = sku_card_list.value.find((o: any) => o.id == id)
  item.loading = true
  goodsStore
    .chooseAndSetGoodsSkusCardAction(id, data)
    .then((res: any) => {
      console.log(res)
      item.name = item.text = res.goods_skus_card.name
      item.goodsSkusCardValue = res.goods_skus_card_value.map((o: any) => {
        o.text = o.value || '属性值'
        return o
      })
      getTableData()
    })
    .finally(() => {
      item.loading = false
    })
}

// 初始化规格的值
export function initSkusCardItem(id: number) {
  const item = sku_card_list.value.find((o: any) => o.id == id)
  const loading = ref(false)
  const inputValue = ref('')
  const inputVisible = ref(false)
  const InputRef = ref()

  const handleClose = (tag: any) => {
    loading.value = true
    goodsStore
      .deleteGoodsSkusCardValueAction(tag.id)
      .then(res => {
        let i = item.goodsSkusCardValue.findIndex((o: any) => o.id === tag.id)
        if (i != -1) {
          item.goodsSkusCardValue.splice(i, 1)
        }
        getTableData()
      })
      .finally(() => {
        loading.value = false
      })
  }

  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value.input.focus()
    })
  }

  const handleInputConfirm = () => {
    if (!inputValue.value) {
      inputVisible.value = false
      return
    }

    loading.value = true
    goodsStore
      .createGoodsSkusCardValueAction({
        goods_skus_card_id: id,
        name: item.name,
        order: 50,
        value: inputValue.value
      })
      .then((res: any) => {
        item.goodsSkusCardValue.push({
          ...res,
          text: res.value
        })
      })
      .finally(() => {
        inputVisible.value = false
        inputValue.value = ''
        loading.value = false
      })
  }

  const handleChange = (value: any, tag: any) => {
    loading.value = true
    goodsStore
      .updateGoodsSkusCardValueAction(tag.id, {
        goods_skus_card_id: id,
        name: item.name,
        order: tag.order,
        value: value
      })
      .then(res => {
        tag.value = value
        getTableData()
      })
      .catch(err => {
        tag.text = tag.value
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    item,
    inputValue,
    inputVisible,
    InputRef,
    handleClose,
    showInput,
    handleInputConfirm,
    loading,
    handleChange
  }
}

// 初始化表格
export function initSkuTable() {
  const skuLabels = computed(() =>
    sku_card_list.value.filter((v: any) => v.goodsSkusCardValue.length > 0)
  )

  // 获取表头
  const tableThs = computed(() => {
    let length = skuLabels.value.length
    return [
      {
        name: '商品规格',
        colspan: length,
        width: '',
        rowspan: length > 0 ? 1 : 2
      },
      {
        name: '销售价',
        width: '100',
        rowspan: 2
      },
      {
        name: '市场价',
        width: '100',
        rowspan: 2
      },
      {
        name: '成本价',
        width: '100',
        rowspan: 2
      },
      {
        name: '库存',
        width: '100',
        rowspan: 2
      },
      {
        name: '体积',
        width: '100',
        rowspan: 2
      },
      {
        name: '重量',
        width: '100',
        rowspan: 2
      },
      {
        name: '编码',
        width: '100',
        rowspan: 2
      }
    ]
  })

  return {
    skuLabels,
    tableThs,
    sku_list
  }
}

// 获取规格表格数据
function getTableData() {
  setTimeout(() => {
    if (sku_card_list.value.length === 0) return []

    let list: any[] = []
    sku_card_list.value.forEach((o: any) => {
      if (o.goodsSkusCardValue && o.goodsSkusCardValue.length > 0) {
        list.push(o.goodsSkusCardValue)
      }
    })

    if (list.length == 0) {
      return []
    }

    //@ts-ignore
    let arr: any = cartesianProductOf(...list)

    // 获取之前的规格列表，将规格ID排序之后转化成字符串
    let beforeSkuList = JSON.parse(JSON.stringify(sku_list.value)).map(
      (o: any) => {
        if (!Array.isArray(o.skus)) {
          o.skus = Object.keys(o.skus).map(k => o.skus[k])
        }
        o.skusId = o.skus
          .sort((a: any, b: any) => a.id - b.id)
          .map((s: any) => s.id)
          .join(',')
        return o
      }
    )

    sku_list.value = []
    sku_list.value = arr.map((skus: any) => {
      let o = getBeforeSkuItem(JSON.parse(JSON.stringify(skus)), beforeSkuList)
      return {
        code: o?.code || '',
        cprice: o?.cprice || '0.00',
        goods_id: goodsId.value,
        image: o?.image || '',
        oprice: o?.oprice || '0.00',
        pprice: o?.pprice || '0.00',
        skus,
        stock: o?.stock || 0,
        volume: o?.volume || 0,
        weight: o?.weight || 0
      }
    })
  }, 200)
}

function getBeforeSkuItem(skus: any, beforeSkuList: any) {
  let skusId = skus
    .sort((a: any, b: any) => a.id - b.id)
    .map((s: any) => s.id)
    .join(',')
  return beforeSkuList.find((o: any) => {
    if (skus.length > o.skus.length) {
      return skusId.indexOf(o.skusId) != -1
    }
    return o.skusId.indexOf(skusId) != -1
  })
}
