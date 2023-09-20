<template>
    <div>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">面经后台</el-breadcrumb-item>
            <el-breadcrumb-item>面经管理</el-breadcrumb-item>
            <div class="hand">
                <span>共{{ total }}条记录</span>
                <button @click="ad">+添加面经</button>
            </div>
            <div class="box">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="stem" label="标题" />
                    <el-table-column prop="creator" label="作者" />
                    <el-table-column prop="likeCount" label="点赞" />
                    <el-table-column prop="views" label="浏览数" />
                    <el-table-column prop="createdAt" label="更新时间" />
                    <el-table-column prop="address" label="操作">
                        <template #default="scope">
                            <div>
                                <el-icon @click="look(scope.row.id)">
                                    <View />
                                </el-icon>
                                <el-icon @click="bian(scope.row)">
                                    <EditPen />
                                </el-icon>
                                <el-icon @click="del(scope.row.id)">
                                    <DeleteFilled />
                                </el-icon>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="foot">
                    <el-pagination background layout="prev, pager, next" :total="total"
                        @current-change="handleCurrentChange" />
                </div>
            </div>
        </el-breadcrumb>
        <!-- 预览抽屉 -->
        <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="70%">
            <h2>预览面经</h2>
            <span v-html="content"></span>
        </el-drawer>
        <!-- 添加/编辑抽屉 -->
        <el-drawer v-model="nave" title="I am the title" :with-header="false" size="70%">
            <h2>{{ title }}</h2>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="标题" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="内容" prop="val">
                    <quill-editor theme="snow" ref="myedit" :content="ruleForm.val"
                        style="height: 300px; width: 100%;"></quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button color="#626aef" @click="add">确认</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ArrowRight, View, EditPen, DeleteFilled } from '@element-plus/icons-vue'
import { listapi, xqapi, addapi, bianpai, delapi } from '@/util/api'
const route = useRoute();
const router = useRouter();
const tableData = ref([])
const total = ref('')
const current = ref(1)
const pageSize = ref(5)
const drawer = ref(false)
const content = ref('')
const title = ref('')
const nave = ref(false)
const id = ref(0)
let myedit = ref()
const getlist = () => {
    listapi({
        current: current.value,
        pageSize: pageSize.value
    }).then((res: any) => {
        // console.log(res);
        tableData.value = res.data.data.rows
        total.value = res.data.data.total
    })
}
getlist()
const handleCurrentChange = (val: number) => {
    current.value = val
    getlist()
}
const look = (id: any) => {
    // console.log(1);
    drawer.value = true
    xqapi({
        id: id
    }).then((res: any) => {
        // console.log(res);
        content.value = res.data.data.content
    })
}
// 打开添加抽屉
const ad = () => {
    nave.value = true
    title.value = '添加面经'
}
const ruleForm = reactive({
    name: '',
    val: ''
})

const rules = reactive({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    val: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
})
// 添加编辑
const add = () => {
    if (title.value == '添加面经') {
        addapi({
            stem: ruleForm.name,
            content: ruleForm.val.ops[0].insert
        }).then((res: any) => {
            console.log(res);
            getlist()
            nave.value = false
        })
    } else {
        bianpai({
            id: id.value,
            stem: ruleForm.name,
            content: ruleForm.val.ops[0].insert
        }).then((res: any) => {
            console.log(res);
            getlist()
            nave.value = false
        })
    }
}
// 打开编辑框
const bian = (val: any) => {
    nave.value = true
    title.value = '编辑'
    ruleForm.name = val.stem
    id.value = val.id
    // console.log(ruleForm.val)
    myedit.value?.setHTML(123)
}
// 删除
const del = (id: any) => {
    delapi({
        id: id
    }).then((res: any) => {
        console.log(res);
        getlist()
    })
}
</script>

<style lang="scss" scoped>
.hand {
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    line-height: 50px;

    button {
        width: 100px;
        height: 30px;
        border-radius: 20px;
        border: 0px;
        background: #6f83fd;
        color: #fff;
        margin-top: 10px;
    }
}

.box {
    border: 1px solid #ccc;
}

.foot {
    display: flex;
    justify-content: center;
    height: 50px;
    line-height: 50px;
}
</style>