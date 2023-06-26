import { ElNotification, ElMessageBox, type MessageBoxData } from 'element-plus'

// 消息提示
export function toast(
  message: string,
  type: 'success' | 'warning' | 'info' | 'error' = 'success',
  dangerouslyUseHTMLString = true
) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000
  })
}

export function showModal(
  content: string = '提示内容',
  type: 'success' | 'warning' | 'info' | 'error' = 'warning',
  title: string = ''
): Promise<MessageBoxData> {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type
  })
}

// 弹出输入框
export function showPrompt(
  tip: string,
  value: string = ''
): Promise<MessageBoxData> {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value
  })
}
