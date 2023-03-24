<template>
  <div class="app-container">
    课程列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="courseQuery.status"
          clearable
          placeholder="课程状态"
        >
          <!-- 弹幕说要把：去了，先不去看看 ,还是改了有用-->
          <el-option value="Normal" label="已发布" />
          <el-option value="Draft" label="未发布" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="courseQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="courseQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="160" align="center"/>

      <el-table-column label="课程状态" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === "Normal" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>
      <!-- 存疑这个地方，我传过来的数据没有lessoNum他从哪找呢 -->
      <el-table-column prop="lessonNum" label="课时数" width="70" align="center"/>

      <el-table-column prop="gmtCreate" label="添加时间" width="160" align="center"/>
      <!-- 同上注释,courseQuery只是用来上传查询的，为了方便，所以把几个需要查询的属性封装，但是真正查询得到的是所有的数据，所以肯定包含lessonNum和viewCount -->
      <el-table-column prop="viewCount" label="浏览数量" width="100" align="center" />

      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <!-- 主要涉及的是修改路由界面跳转,当我们点击修改相应按键，使其跳转到相应界面进行修改 -->
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程基本信息</el-button>
          </router-link>
        
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit" 
              >编辑课程大纲</el-button
            >
          </router-link>
            
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
//引入course.js文件
import course from "@/api/edu/course.js";
export default {
  //核心代码位置
  data() {
    //定义变量，初始值
    return {
      list: null, //查询之后返回集合
      page: 1, //当前页
      limit: 10, //每页记录数
      total: 0, //总记录数
      courseQuery: {}, //条件封装对象
    };
  },
  created() {
    //页面渲染前执行，一般调用methods定义的方法
    this.getList();
  },
  methods: {
    //创建具体的方法，调用course.js定义的方法
    getList(page = 1) {
      this.page = page;
      course
        .getCourseListPage(this.page, this.limit, this.courseQuery)
        .then((response) => {
          // 请求成功
          //response接受返回数据
          // console.log(response);
          this.list = response.data.rows;
          this.total = response.data.total;
          console.log(this.list);
          console.log(this.total);
        })
        .catch((error) => {
          //请求失败
          console.log(error);
        });
    },
    resetData() {
      //清空方法
      //表单输入项数据清空
      this.courseQuery = {};
      //查询所有课程数据
      this.getList();
    },
    //删除课程的方法
    removeDataById(id) {
      this.$confirm("此操作将永久删除该课程记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          course
            .deleteCourseById(id)
            .then((response) => {
              // 请求成功
              //提示信息
              this.$message({
                type: "success",
                message: "删除成功!",
              });

              //回到列表页面并刷新
              this.getList();
            })
            .catch((error) => {
              //请求失败
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>