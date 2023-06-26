import { ref, reactive } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { useManagerStore } from '@/stores/manager'
import { storeToRefs } from 'pinia'
import { toast, showModal } from '@/utils/util'
import router from '@/router'

export const useRepassword = () => {
  // 修改密码

  const managerStore = useManagerStore()

  const { user } = storeToRefs(managerStore)

  // do not use same name with ref
  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })

  const rules = reactive<FormRules<typeof form>>({
    oldpassword: [
      {
        required: true,
        message: '旧密码不能为空',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '新密码不能为空',
        trigger: 'blur'
      }
    ],
    repassword: [
      {
        required: true,
        message: '确认密码不能为空',
        trigger: 'blur'
      }
    ]
  })

  const formRef = ref<FormInstance>()
  const formDrawerRef = ref()

  const rePassword = () => {
    formDrawerRef.value.open()
  }

  const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // @ts-ignore
    formEl.validate(valid => {
      if (valid) {
        formDrawerRef.value.showLoading()
        managerStore
          .updatepasswordAction(form)
          .then(() => {
            toast('修改密码成功，请重新登录')
            managerStore.logoutAction().finally(() => {
              // 跳转回登录页
              router.push('/login')
            })
          })
          .finally(() => {
            formDrawerRef.value.hideLoading()
          })
      }
    })
  }

  return {
    form,
    rules,
    formRef,
    formDrawerRef,
    onSubmit,
    rePassword,
    user
  }
}

export const useLogout = () => {
  const managerStore = useManagerStore()

  const logout = () => {
    showModal('是否要退出登录？')
      .then(res => {
        managerStore.logoutAction().finally(() => {
          // 跳转回登录页
          router.push('/login')
          // 提示退出登录成功
          toast('退出登录成功')
        })
      })
      .catch(() => {})
  }

  return {
    logout
  }
}
