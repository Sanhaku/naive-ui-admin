<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-title">用户注册</div>
        <div class="view-account-top-desc">ECNU 会议论文投稿系统</div>
      </div>
      <div class="view-account-form">
        <n-form ref="formRef" label-placement="left" size="large" :model="formValue" :rules="rules">
          <n-form-item label="邮箱" path="email">
            <n-input v-model:value="formValue.email" placeholder="请输入邮箱">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <MailOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input
              v-model:value="formValue.password"
              type="password"
              showPasswordOn="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item label="国家" path="country">
            <n-input v-model:value="formValue.country" placeholder="请输入国家" />
          </n-form-item>

          <n-form-item label="城市" path="city">
            <n-input v-model:value="formValue.city" placeholder="请输入城市" />
          </n-form-item>

          <n-form-item label="机构" path="department">
            <n-input v-model:value="formValue.department" placeholder="请输入所属机构" />
          </n-form-item>

          <n-form-item label="First Name" path="firstName">
            <n-input v-model:value="formValue.firstName" placeholder="First Name" />
          </n-form-item>
          <n-form-item label="Middle Name" path="midName">
            <n-input v-model:value="formValue.midName" placeholder="Middle Name" />
          </n-form-item>
          <n-form-item label="Last Name" path="lastName">
            <n-input v-model:value="formValue.lastName" placeholder="Last Name" />
          </n-form-item>

          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              注册
            </n-button>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex view-account-other">
              <div class="flex-initial" style="margin-left: auto">
                <router-link to="/login">返回登录</router-link>
              </div>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMessage } from 'naive-ui';
  import { MailOutline, LockClosedOutline } from '@vicons/ionicons5';
  import { register } from '@/api/user';

  const defaultValueRef = () => ({
    country: '',
    city: '',
    department: '',
    firstName: '',
    midName: '',
    lastName: '',
    email: '',
    password: '',
  });

  let formValue = reactive(defaultValueRef());

  interface FormState {
    email: string;
    password: string;
    country: string;
    city: string;
    department: string;
    firstName: string;
    midName: string;
    lastName: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);

  const rules = {
    email: { required: true, message: '请输入邮箱', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
    firstName: { required: true, message: '请输入First Name', trigger: 'blur' },
    lastName: { required: true, message: '请输入Last Name', trigger: 'blur' },
    midName: { required: true, message: '请输入Middle Name', trigger: 'blur' },
    country: { required: true, message: '请输入国家', trigger: 'blur' },
    city: { required: true, message: '请输入城市', trigger: 'blur' },
    department: { required: true, message: '请输入所属机构', trigger: 'blur' },
  };

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { email, password, country, city, department, firstName, midName, lastName } =
          formValue;
        const params: FormState = {
          email,
          password,
          country,
          city,
          department,
          firstName,
          midName,
          lastName,
        };
        // const { code, message: msg } = await register(params);
        const res = await register(params);
        console.log(res);
        if (res) {
          message.success('注册成功，请登录');
          router.push({ name: 'Login' });
        } else {
          message.info('注册失败');
        }
      } else {
        message.error('请填写完整信息');
      }
    });
  };
</script>

<style lang="less" scoped>
  .view-account-top-title {
    color: black;
    font-size: 32px;
  }
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      flex: 1;
      padding: 32px 0;
      width: 384px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
