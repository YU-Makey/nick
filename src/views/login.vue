<template>
    <div class="bg">
        <div class="box">
            <div class="hand">
                <h2>积云后台</h2>
            </div>
            <div class="foot">
                
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                     status-icon>
                    <el-form-item prop="name">
                        <p>用户名:</p>
                        <el-input v-model="ruleForm.name" />
                    </el-form-item>
                    <el-form-item prop="pass">
                        <p>密码:</p>
                        <el-input v-model="ruleForm.pass" show-password/>
                    </el-form-item>
                    <el-form-item style="margin-left: 100px;">
                        <el-button type="primary" @click="go">登录</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import {loginapi} from '@/util/api'
const route = useRoute();
const router = useRouter();
const ruleForm = reactive({
  name: 'admin',
  pass:'admin'
})
const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  pass: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})
const go=()=>{
    loginapi({
        username:ruleForm.name,
        password:ruleForm.pass
    }).then((res:any)=>{
        console.log(res);
        localStorage.setItem('token',res.data.data.token)
        localStorage.setItem('name',res.data.data.currentAuthority)
        router.push('/come')
    })
}
</script>

<style lang="scss" scoped>
.bg {
    background: #f2f6ff;
}

.box {
    width: 600px;
    margin: 0 auto;
    height: 100vh;
    padding-top: 250px;

    .hand {
        width: 600px;
        height: 100px;
        background: #7082fb;

        h2 {
            text-align: center;
            line-height: 100px;
            color: #fff;
        }
    }

    .foot {
        width: 560px;
        height: 300px;
        background: #fff;
        padding: 20px;
        .el-form-item{
            margin-left: -120px;
        }
    }
}
</style>