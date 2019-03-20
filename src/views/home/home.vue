<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row>
            <Col span="8">
                <Row>
                    <Card>
                        <Row type="flex" class="user-infor">
                            <Col span="8">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <!-- 头像 -->
                                    <template v-if="userCorp.length == 0"><!-- 当登陆员工端时 -->
                                                <template v-if="userEmp.headiconpath == null || userEmp.headiconpath == undefined">
                                                    <img class="avator-img" src="../../images/pho.png" :title="userEmp.employeename" />
                                                </template>
                                                <template v-else>
                                                    <img class="avator-img" :src="'/img/'+ userEmp.headiconpath" :title="userEmp.employeename" /></img>
                                                </template>
                                    </template>
                                    <template v-else><!-- 当登陆公司端时 -->
                                                <template v-if="userCorp.businesslicensepic == null || userCorp.businesslicensepic == undefined">
                                                    <img class="avator-img" src="../../images/pho.png" :title="userCorp.corpname" />
                                                </template>
                                                <template v-else>
                                                    <img class="avator-img" :src="'/img/'+ userCorp.businesslicensepic" :title="userCorp.corpname" /></img>
                                                </template>
                                    </template>
                                </Row>
                            </Col>
                            <Col span="16" style="padding-left:6px;">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <div v-if="user != undefined">
                                        <b class="card-user-infor-name">{{ user.name }}</b>
                                        <p>权限：{{  }}</p>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <div class="line-gray"></div>
                        <Row class="margin-top-8">
                            <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                            <Col span="16" class="padding-left-8">{{ loginDate }}</Col>
                        </Row>
                        <Row class="margin-top-8">
                            <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                            <Col span="16" class="padding-left-8">{{ loginAddress }}</Col>
                        </Row>
                    </Card>
                </Row>
                <Row class="margin-top-10">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-checkbox-outline"></Icon>
                            待办事项
                        </p>
                        <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                            <Icon type="plus-round"></Icon>
                        </a>
                        <Modal
                            v-model="showAddNewTodo"
                            title="添加新的待办事项"
                            @on-ok="addNew"
                            @on-cancel="cancelAdd">
                            <Row type="flex" justify="center">
                                <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                            </Row>
                            <Row slot="footer">
                                <Button type="text" @click="cancelAdd">取消</Button>
                                <Button type="primary" @click="addNew">确定</Button>
                            </Row>
                        </Modal>
                        <div class="to-do-list-con">
                            <div v-for="(item, index) in toDoList" :key="index" class="to-do-item">
                                <to-do-list-item :content="item.title"></to-do-list-item>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Col>
            <Col span="16" class-name="padding-left-5">
                <Row>
                    <Col span="6">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="本月新增客户"
                        ></infor-card>
                    </Col>
                    <Col span="6" class-name="padding-left-5">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="本月预约车辆"
                        ></infor-card>
                    </Col>
                    <Col span="6" class-name="padding-left-5">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="upload"
                            color="#ffd572"
                            intro-text="本月售后订单"
                        ></infor-card>
                    </Col>
                    <Col span="6" class-name="padding-left-5">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.transfer"
                            iconType="shuffle"
                            color="#f25e43"
                            intro-text="本月成交量"
                        ></infor-card>
                    </Col>
                </Row>
                <Row class="margin-top-10">
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            今日安装设备地理分布
                        </p>
                        <div class="map-con">
                            <Col span="10">
                                <map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
                            </Col>
                            <Col span="14" class="map-incon">
                                <Row type="flex" justify="center" align="middle">
                                    <home-map :city-data="cityData"></home-map>
                                </Row>
                            </Col>
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        上周每日新装订单统计
                    </p>
                    <div class="data-source-row">
                        <visite-volume></visite-volume>
                    </div>
                </Card>
            </Col>
            <Col span="8" class="padding-left-10">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        本月订单量
                    </p>
                    <div class="data-source-row">
                        <data-source-pie></data-source-pie>
                    </div>
                </Card>
            </Col>
            <Col span="8" class="padding-left-10">
                <Card style="position:relative;">
                    <p slot="title" class="card-title">
                        <Icon type="clipboard"></Icon>
                        留言列表
                        <Icon type="plus-round" style="position:absolute;right:1%;top:5%;z-index:1;font-size:20px;color:#fff;cursor:pointer;" @click.native="addMsg"></Icon>
                    </p>
                    <span class="addmessage"></span><!-- 添加留言 -->

                    <!-- 显示已有留言 -->
                    <div class="data-source-row">
                            <Row :gutter="20" v-for="item in leaveMsgList" :key="item.id" class="showline" @click.native="msgdetail(item.id)">
                                <Col :span="16" class="autow">
                                    <!-- {{ htmlTransfer(item.content) }} -->
                                    {{ item.content }}
                                </Col>
                                <Col :span="8" class="fixedw">
                                    {{ item.releasedate == null ? "" :fmtdata.formatDate.format(new Date(item.releasedate), 'yyyy-MM-dd')  }}
                                </Col>
                          </Row>
                  </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    月订单量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row>



        <!-- 新增留言 start-->
        <Modal
            v-model="addMsgVisible"
            title="新增留言"
            @on-ok="addMsgSubmit"
            @on-cancel="addMsgVisible = false"
            loading
            ok-text="确认新增"
            width="350">
            <Form :model="addMsgForm" ref="addMsgForm">
                <Row :gutter="20" >
                    <Col span="12">
                        <FormItem label="" prop="author">
                            <Input v-model="addMsgForm.author" placeholder="请输入作者">
                                <span slot="prepend">作者</span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="" prop="releasedate">
                            <DatePicker type="date" v-model="addMsgForm.releasedate" :options="options1" placeholder="选择日期">
                            </DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="内容" prop="content">
                            <Input type="textarea" v-model="addMsgForm.content" placeholder="请输入留言内容"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import util from '../../styles/js/util.js';
import Cookies from 'js-cookie';
import $ from '../../libs/jquery-1.10.2.min.js';

export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem
    },
    data () {
        return {
            fmtdata:util,
            user:[],//用户信息
            userEmp:[],//员工
            userCorp:[],//公司
            loginDate:'',//得到登陆的时间，地址信息
            loginAddress:'',//得到登陆的时间，地址信息
            addMsgVisible:false,//新增留言
            addMsgForm:{
                author:'',
                content:'',
                releasedate:'',
            },
            toDoList: [
                {
                    title: '下午三点万网会议室开会'
                },
                {
                    title: '本月员工KPI审核'
                },
                {
                    title: '万网公司员工户口复印件'
                },
                {
                    title: '通知周六加班事宜'
                },
                {
                    title: '发布万网新闻'
                }
            ],
            leaveMsgList:[
                {
                    content: '今天出了太阳，天气真好！',
                    releasedate:'2017-11-01'
                },
                {
                    content: '新的一个月开始了，努力奋斗！',
                    releasedate:'2017-11-01'
                },
                {
                    content: '双11到了，剁手你准备好了吗？',
                    releasedate:'2017-11-11'
                },
                {
                    content: '欢度元旦',
                    releasedate:'2018-01-01'
                },
            ],
            count: {
                createUser: 496,
                visit: 3264,
                collection: 249305,
                transfer: 3903498
            },
            options1: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了今天');
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了昨天');
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了一周前');
                            }
                        }
                    ]
                },
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: ''
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        // 留言板html转换——去掉html标签
        htmlTransfer(ht){
            if ($(ht).length == 0 ) {//当没有html标签时
                 return ht;
            }else{//有html标签时，返回纯文本内容
                return $(ht).text();
            }
        },
        // 留言板
        addMsg() {
            this.addMsgVisible = true;
        },
        // 新增留言按钮
        addMsgSubmit(){
            this.$Modal.info({
                content: '新增留言功能暂未开通！',
                onOk: () => {
                    this.addMsgVisible = false;
                },
            });
            // let para = {
            //         content:this.addMsgForm.content,
            //         author:this.addMsgForm.author,//当前作者
            //         releasedate:this.fmtdata.formatDate.format(new Date(), 'yyyy-MM-dd'),//当前日期
            // }
            // addArtcile(para).then((res) => {
            //         this.$message ({
            //             message : '新增留言成功',
            //             type: 'success'
            //         });
            //         this.initNewList();//加载文章
            // });
            this.$refs.addMsgForm.resetFields();//初始化表单
        },
        //进入留言详情
        msgdetail:function(id){
            // let params = {
            //     id:id
            // }
            // this.addFormVisible = true;
            // getArtcileListItem(params).then((res) => {
            //     $("div.el-dialog__body").html(res.data.data.content);
            // });
        },
        // 添加待办事宜
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    },
    mounted () {
            // 得到登陆的用户信息
            this.user = JSON.parse(sessionStorage.getItem('user'));
            if (this.user == null && Cookies.get('user')) {//sessionStorage未登陆但cookies有信息时，到登录页，解决浏览器多窗口登陆
                this.$router.push({name:'login'});
            }else{
                if (this.user.employeeInfo == null) {
                    this.userCorp = this.user.corporateInfo;//存储公司信息
                }else if (this.user.corporateInfo == null) {}{
                    this.userEmp = this.user.employeeInfo;//存储员工信息
                }
            }

            // 得到登陆的时间信息
            this.loginDate = util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
            //得到登陆的地址信息 
           $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', () => {
                this.loginAddress = remote_ip_info.country + '-' + remote_ip_info.province +'-' + remote_ip_info.city;
            });
    },
};
</script>
