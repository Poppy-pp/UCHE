<template>
    <section>
        <Col :span="4">
            <div>
                <el-steps :space="130" process-status="finish" direction="vertical" style="margin: 20px 0 0 20px;" :active="active" finish-status="success">
                  <el-step title="签合同" description="签订订单合同信息" icon="el-icon-edit"> </el-step>
                  <el-step title="付款" description="填写购车付款信息" icon="el-icon-mobile-phone"></el-step>
                  <el-step title="交车" description="填写选定车辆信息" icon="el-icon-refresh"></el-step>
                  <el-step title="保险" description="填写车辆保险信息" icon="el-icon-message"></el-step>
                  <el-step title="上牌" description="填写车辆牌照信息" icon="el-icon-location-outline"></el-step>
                  <el-step title="完成" description="完成订单，查看订单" icon="el-icon-circle-check-outline"></el-step>
                </el-steps>
            </div>
        </Col>

        <Col :span="19">
            <div style="marginTop:20px;">
                <!-- 步骤一：签合同 -->
                <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" v-if="active == 0" class="step-form">
                    <el-card :body-style="{ padding: '20px' }">
                            <el-col :span="24">
                                <span class="formTile">订单节点</span>
                            </el-col>
                            <el-row>
                                        <el-col :span="12">
                                                <el-tag style="margin:10px 10px 20px;border-radius: 50%;width: 55px;height: 55px;line-height: 55px;">{{ '签合同' }}</el-tag>
                                        </el-col>
                            </el-row>

                            <el-col :span="24">
                                <span class="formTile">订单信息</span>
                            </el-col>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="订单号" prop="orderno">
                                        <span>{{ addForm.orderno }}</span>
                                    </el-form-item>
                                    <el-form-item label="创建人" prop="createby">
                                        <span>{{ addForm.createby == null ? '暂无' : addForm.createby }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="订单状态" prop="corpshortname" >
                                        <span>{{ addForm.name_ }}</span>
                                    </el-form-item>
                                    <el-form-item label="创建时间" prop="createdate">
                                        <span>{{ addForm.createdate == null ? '暂无' : addForm.createdate }}</span>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-col :span="24" class="process">
                                <span class="formTile" style="position:absolute;"></span>
                                <el-tabs v-model="activeName" >
                                    <el-tab-pane label="登记信息" name="1">
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-form-item label="客户姓名" prop="custname" >
                                                        <span>{{ addForm.custname }}</span>
                                                    </el-form-item>
                                                    <el-form-item label="联系方式" prop="corpshortname">
                                                         <span>{{ addForm.custmobile }}</span>
                                                    </el-form-item>
                                                    <el-form-item label="负责人" prop="tel1">
                                                         <span>{{ addForm.employeename == null ? '暂无' : addForm.employeename }}</span>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                    </el-tab-pane>

                                    <el-tab-pane label="选定车辆" name="2">
                                            <el-row>
                                                <el-col :span="20">
                                                    <el-form-item label="车型" prop="model" >
                                                        <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                            <el-option
                                                              v-for="item in modelList"
                                                              :key="item.model"
                                                              :label="item.model"
                                                              :value="item.model">
                                                            </el-option>
                                                          </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                     <el-form-item label="车辆颜色" prop="color">
                                                         <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="车架号" prop="vin">
                                                         <el-input v-model="vehicleInfo.vin" auto-complete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="发动机号" prop="enginenum">
                                                         <el-input v-model="vehicleInfo.enginenum" auto-complete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="车价" prop="price">
                                                         <el-input v-model="vehicleInfo.price" auto-complete="off"><template slot="append">万元</template></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                    </el-tab-pane>

                                    <el-tab-pane label="合同信息" name="3">
                                        <el-row>
                                                <el-col :span="12">
                                                     <el-form-item label="已付定金" prop="depositamount">
                                                         <el-input v-model="addForm.depositamount" auto-complete="off"><template slot="append">元</template></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="签约日期" prop="orderdate">
                                                         <el-date-picker
                                                          v-model="addForm.orderdate"
                                                          type="date"
                                                          placeholder="选择签约日期">
                                                        </el-date-picker>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                    </el-tab-pane>

                                    <el-tab-pane label="订车信息" name="4">
                                        <el-row>
                                                <el-col :span="20">
                                                     <el-form-item label="车型" prop="model" >
                                                        <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                            <el-option
                                                              v-for="item in modelList"
                                                              :key="item.model"
                                                              :label="item.model"
                                                              :value="item.model">
                                                            </el-option>
                                                          </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="12">
                                                     <el-form-item label="车辆颜色" prop="color">
                                                         <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="取车时间" prop="vehiclehandoverdate">
                                                         <el-date-picker
                                                          v-model="addForm.vehiclehandoverdate"
                                                          type="date"
                                                          placeholder="选择取车时间">
                                                        </el-date-picker>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                    </el-tab-pane>
                                </el-tabs>

                                <el-button-group class="step-btn">
                                    <!-- 下一步按钮 -->
                                    <el-button type="primary" @click="next">{{'下一步 【付款】' }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                                    <!-- 取消订单按钮 -->
                                    <el-button type="danger" @click="cancelTask" > {{  '取消订单' }}</el-button>
                                    <!-- 返回按钮 -->
                                    <el-button type="primary" @click="this.window.history.go(-1)">返回</el-button>
                                </el-button-group>

                            </el-col>
                    </el-card>
                </el-form>







                <!-- 步骤二：付款 -->
                <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" v-if="active == 1" class="step-form">
                    <el-card :body-style="{ padding: '20px' }">
                        <el-col :span="24">
                            <span class="formTile">订单节点</span>
                        </el-col>
                        <el-row>
                                    <el-col :span="12" class="circleTag">
                                            <el-tag type="success">{{ '签合同' }}</el-tag>——
                                            <el-tag>{{ '付款' }}</el-tag>
                                    </el-col>
                        </el-row>

                        <el-col :span="24">
                            <span class="formTile">订单信息</span>
                        </el-col>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="订单号" prop="orderno">
                                    <span>{{ addForm.orderno }}</span>
                                </el-form-item>
                                <el-form-item label="创建人" prop="createby">
                                    <span>{{ addForm.createby == null ? '暂无' : addForm.createby }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="订单状态" prop="corpshortname" >
                                    <span>{{ addForm.name_ }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间" prop="createdate">
                                    <span>{{ addForm.createdate == null ? '暂无' : addForm.createdate }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-col :span="24" class="process">
                            <span class="formTile" style="position:absolute;"></span>
                            <el-tabs v-model="activeName" >
                                <el-tab-pane label="登记信息" name="1">
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="客户姓名" prop="custname" >
                                                    <span>{{ addForm.custname }}</span>
                                                </el-form-item>
                                                <el-form-item label="联系方式" prop="corpshortname">
                                                     <span>{{ addForm.custmobile }}</span>
                                                </el-form-item>
                                                <el-form-item label="负责人" prop="tel1">
                                                     <span>{{ addForm.employeename == null ? '暂无' : addForm.employeename }}</span>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="选定车辆" name="2">
                                        <el-row>
                                            <el-col :span="20">
                                                <el-form-item label="车型" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="车辆颜色" prop="color">
                                                     <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="车架号" prop="vin">
                                                     <el-input v-model="vehicleInfo.vin" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="发动机号" prop="enginenum">
                                                     <el-input v-model="vehicleInfo.enginenum" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="车价" prop="price">
                                                     <el-input v-model="vehicleInfo.price" auto-complete="off"><template slot="append">万元</template></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="合同信息" name="3">
                                    <el-row>
                                            <el-col :span="12">
                                                 <el-form-item label="已付定金" prop="depositamount">
                                                     <el-input v-model="addForm.depositamount" auto-complete="off"><template slot="append">元</template></el-input>
                                                </el-form-item>
                                                <el-form-item label="签约日期" prop="orderdate">
                                                     <el-date-picker
                                                      v-model="addForm.orderdate"
                                                      type="date"
                                                      placeholder="选择签约日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="订车信息" name="4">
                                    <el-row>
                                            <el-col :span="20">
                                                 <el-form-item label="车型" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="车辆颜色" prop="color">
                                                     <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="取车时间" prop="vehiclehandoverdate">
                                                     <el-date-picker
                                                      v-model="addForm.vehiclehandoverdate"
                                                      type="date"
                                                      placeholder="选择取车时间">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="付款信息" name="5">
                                    <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="付款类型" prop="deposittype" >
                                                    <el-radio v-model="addForm.deposittype" label="1" border>定金</el-radio>
                                                    <el-radio v-model="addForm.deposittype" label="2" border>订金</el-radio>
                                                </el-form-item>
                                                <el-form-item label="付款方式" prop="paymentmode" >
                                                    <el-radio v-model="addForm.paymentmode" label="FULL" border>全款</el-radio>
                                                    <el-radio v-model="addForm.paymentmode" label="LOAN" border>贷款</el-radio>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>
                            </el-tabs>

                            <el-button-group class="step-btn">
                                    <!-- 下一步按钮 -->
                                    <el-button type="primary" @click="next">{{'下一步 【交车】' }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                                    <!-- 取消订单按钮 -->
                                    <el-button type="danger" @click="cancelTask" > {{  '取消订单' }}</el-button>
                                    <!-- 返回按钮 -->
                                    <el-button type="primary" @click="this.window.history.go(-1)">返回</el-button>
                            </el-button-group>
                        </el-col>
                    </el-card>
                </el-form>







                <!-- 步骤三：交车 -->
                <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" v-if="active == 2" class="step-form">
                    <el-card :body-style="{ padding: '20px' }">
                        <el-col :span="24">
                            <span class="formTile">订单节点</span>
                        </el-col>
                        <el-row>
                                    <el-col :span="12" class="circleTag">
                                            <el-tag type="success">{{ '签合同' }}</el-tag>——
                                            <el-tag type="success">{{ '付款' }}</el-tag>——
                                            <el-tag>{{ '交车' }}</el-tag>
                                    </el-col>
                        </el-row>

                        <el-col :span="24">
                            <span class="formTile">订单信息</span>
                        </el-col>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="订单号" prop="orderno">
                                    <span>{{ addForm.orderno }}</span>
                                </el-form-item>
                                <el-form-item label="创建人" prop="createby">
                                    <span>{{ addForm.createby == null ? '暂无' : addForm.createby }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="订单状态" prop="corpshortname" >
                                    <span>{{ addForm.name_ }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间" prop="createdate">
                                    <span>{{ addForm.createdate == null ? '暂无' : addForm.createdate }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-col :span="24" class="process">
                            <span class="formTile" style="position:absolute;"></span>
                            <el-tabs v-model="activeName" >
                                <el-tab-pane label="登记信息" name="1">
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="客户姓名" prop="custname" >
                                                    <span>{{ addForm.custname }}</span>
                                                </el-form-item>
                                                <el-form-item label="联系方式" prop="corpshortname">
                                                     <span>{{ addForm.custmobile }}</span>
                                                </el-form-item>
                                                <el-form-item label="负责人" prop="tel1">
                                                     <span>{{ addForm.employeename == null ? '暂无' : addForm.employeename }}</span>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="选定车辆" name="2">
                                        <el-row>
                                            <el-col :span="20">
                                                <el-form-item label="车型" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="车辆颜色" prop="color">
                                                     <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="车架号" prop="vin">
                                                     <el-input v-model="vehicleInfo.vin" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="发动机号" prop="enginenum">
                                                     <el-input v-model="vehicleInfo.enginenum" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="车价" prop="price">
                                                     <el-input v-model="vehicleInfo.price" auto-complete="off"><template slot="append">万元</template></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="合同信息" name="3">
                                    <el-row>
                                            <el-col :span="12">
                                                 <el-form-item label="已付定金" prop="depositamount">
                                                     <el-input v-model="addForm.depositamount" auto-complete="off"><template slot="append">元</template></el-input>
                                                </el-form-item>
                                                <el-form-item label="签约日期" prop="orderdate">
                                                     <el-date-picker
                                                      v-model="addForm.orderdate"
                                                      type="date"
                                                      placeholder="选择签约日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="订车信息" name="4">
                                    <el-row>
                                            <el-col :span="20">
                                                 <el-form-item label="车型" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="车辆颜色" prop="color">
                                                     <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="取车时间" prop="vehiclehandoverdate">
                                                     <el-date-picker
                                                      v-model="addForm.vehiclehandoverdate"
                                                      type="date"
                                                      placeholder="选择取车时间">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="付款信息" name="5">
                                    <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="付款类型" prop="deposittype" >
                                                    <el-radio v-model="addForm.deposittype" label="1" border>定金</el-radio>
                                                    <el-radio v-model="addForm.deposittype" label="2" border>订金</el-radio>
                                                </el-form-item>
                                                <el-form-item label="付款方式" prop="paymentmode" >
                                                    <el-radio v-model="addForm.paymentmode" label="FULL" border>全款</el-radio>
                                                    <el-radio v-model="addForm.paymentmode" label="LOAN" border>贷款</el-radio>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="交车信息" name="6">
                                    <el-row>
                                            <el-col :span="20">
                                                 <el-form-item label="车型" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="车辆颜色" prop="color">
                                                     <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="取车时间" prop="vehiclehandoverdate">
                                                     <el-date-picker
                                                      v-model="addForm.vehiclehandoverdate"
                                                      type="date"
                                                      placeholder="选择取车时间">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>
                            </el-tabs>

                            <el-button-group class="step-btn">
                                    <!-- 下一步按钮 -->
                                    <el-button type="primary" @click="next">{{'下一步 【保险】' }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                                    <!-- 取消订单按钮 -->
                                    <el-button type="danger" @click="cancelTask" > {{  '取消订单' }}</el-button>
                                    <!-- 返回按钮 -->
                                    <el-button type="primary" @click="this.window.history.go(-1)">返回</el-button>
                            </el-button-group>
                        </el-col>
                    </el-card>
                </el-form>









                <!-- 步骤四：保险 -->
                <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" v-if="active == 3" class="step-form">
                    <el-card :body-style="{ padding: '20px' }">
                        <el-col :span="24">
                            <span class="formTile">订单节点</span>
                        </el-col>
                        <el-row>
                                    <el-col :span="12" class="circleTag">
                                            <el-tag type="success">{{ '签合同' }}</el-tag>——
                                            <el-tag type="success">{{ '付款' }}</el-tag>——
                                            <el-tag type="success">{{ '交车' }}</el-tag>——
                                            <el-tag>{{ '保险' }}</el-tag>
                                    </el-col>
                        </el-row>

                        <el-col :span="24">
                            <span class="formTile">订单信息</span>
                        </el-col>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="订单号" prop="orderno">
                                    <span>{{ addForm.orderno }}</span>
                                </el-form-item>
                                <el-form-item label="创建人" prop="createby">
                                    <span>{{ addForm.createby == null ? '暂无' : addForm.createby }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="订单状态" prop="corpshortname" >
                                    <span>{{ addForm.name_ }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间" prop="createdate">
                                    <span>{{ addForm.createdate == null ? '暂无' : addForm.createdate }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-col :span="24" class="process">
                            <span class="formTile" style="position:absolute;"></span>
                            <el-tabs v-model="activeName" >
                                <el-tab-pane label="登记信息" name="1">
                                        <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="客户姓名" prop="custname" >
                                                    <span>{{ addForm.custname }}</span>
                                                </el-form-item>
                                                <el-form-item label="联系方式" prop="corpshortname">
                                                     <span>{{ addForm.custmobile }}</span>
                                                </el-form-item>
                                                <el-form-item label="负责人" prop="tel1">
                                                     <span>{{ addForm.employeename == null ? '暂无' : addForm.employeename }}</span>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="选定车辆" name="2">
                                        <el-row>
                                            <el-col :span="20">
                                                <el-form-item label="车型" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="车辆颜色" prop="color">
                                                     <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="车架号" prop="vin">
                                                     <el-input v-model="vehicleInfo.vin" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="发动机号" prop="enginenum">
                                                     <el-input v-model="vehicleInfo.enginenum" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="车价" prop="price">
                                                     <el-input v-model="vehicleInfo.price" auto-complete="off"><template slot="append">万元</template></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="合同信息" name="3">
                                    <el-row>
                                            <el-col :span="12">
                                                 <el-form-item label="已付定金" prop="depositamount">
                                                     <el-input v-model="addForm.depositamount" auto-complete="off"><template slot="append">元</template></el-input>
                                                </el-form-item>
                                                <el-form-item label="签约日期" prop="orderdate">
                                                     <el-date-picker
                                                      v-model="addForm.orderdate"
                                                      type="date"
                                                      placeholder="选择签约日期">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="订车信息" name="4">
                                    <el-row>
                                            <el-col :span="20">
                                                 <el-form-item label="车型" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="车辆颜色" prop="color">
                                                     <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="取车时间" prop="vehiclehandoverdate">
                                                     <el-date-picker
                                                      v-model="addForm.vehiclehandoverdate"
                                                      type="date"
                                                      placeholder="选择取车时间">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="付款信息" name="5">
                                    <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="付款类型" prop="deposittype" >
                                                    <el-radio v-model="addForm.deposittype" label="1" border>定金</el-radio>
                                                    <el-radio v-model="addForm.deposittype" label="2" border>订金</el-radio>
                                                </el-form-item>
                                                <el-form-item label="付款方式" prop="paymentmode" >
                                                    <el-radio v-model="addForm.paymentmode" label="FULL" border>全款</el-radio>
                                                    <el-radio v-model="addForm.paymentmode" label="LOAN" border>贷款</el-radio>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="交车信息" name="6">
                                    <el-row>
                                            <el-col :span="20">
                                                 <el-form-item label="车型" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="车辆颜色" prop="color">
                                                     <el-input v-model="vehicleInfo.color" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="取车时间" prop="vehiclehandoverdate">
                                                     <el-date-picker
                                                      v-model="addForm.vehiclehandoverdate"
                                                      type="date"
                                                      placeholder="选择取车时间">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                                <el-tab-pane label="保险信息" name="7">
                                    <el-row>
                                            <el-col :span="12">
                                                <el-form-item label="被保人" prop="custname">
                                                    <span>{{addForm.custname}}</span>
                                                </el-form-item>
                                                <el-form-item label="电话" prop="custmobile">
                                                     <span>{{addForm.custmobile}}</span>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="20">
                                                 <el-form-item label="被保车辆" prop="model" >
                                                    <el-select v-model="vehicleInfo.model" @visible-change="modelChange" :loading="modelLoading" filterable placeholder="请选择车型" clearable remote :remote-method="modelChangeSelect" >
                                                        <el-option
                                                          v-for="item in modelList"
                                                          :key="item.model"
                                                          :label="item.model"
                                                          :value="item.model">
                                                        </el-option>
                                                      </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="12">
                                                 <el-form-item label="保险单号" prop="policynumber">
                                                     <el-input v-model="insuVehiclepolicy.policynumber" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="保险公司" prop="insurancecorp">
                                                     <el-input v-model="insuVehiclepolicy.insurancecorp" auto-complete="off"></el-input>
                                                </el-form-item>
                                                <el-form-item label="投保时间" prop="insureddate">
                                                     <el-date-picker
                                                      v-model="insuVehiclepolicy.insureddate"
                                                      type="date"
                                                      placeholder="选择投保时间">
                                                    </el-date-picker>
                                                </el-form-item>
                                                <el-form-item label="保险项目" prop="values">
                                                     <el-checkbox-group v-model="values">
                                                          <el-checkbox-button v-for="item in insTypeInfo" :label="item.insuranceitem" :key="item.id">{{item.insuranceitem}}</el-checkbox-button>
                                                     </el-checkbox-group>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                </el-tab-pane>

                            </el-tabs>

                            <el-button-group class="step-btn">
                                    <!-- 下一步按钮 -->
                                    <el-button type="primary" @click="next">{{'下一步 【上牌】' }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                                    <!-- 取消订单按钮 -->
                                    <el-button type="danger" @click="cancelTask" > {{  '取消订单' }}</el-button>
                                    <!-- 返回按钮 -->
                                    <el-button type="primary" @click="this.window.history.go(-1)">返回</el-button>
                            </el-button-group>
                        </el-col>
                    </el-card>
                </el-form>


            </div>
        </Col>
        
       
    </section>
</template>

<style type="text/css">
    .process .el-tabs__header{margin-left: 13px;}
    .process .el-tabs__item{font-size: 1rem;}
    .process .el-tabs__content{height: 400px;}
    .process .el-select,.process .el-date-editor.el-input,.process .el-date-editor.el-input__inner{width: 100%;}
    .circleTag .el-tag{margin:10px 10px 20px;border-radius: 50%;width: 55px;height: 55px;line-height: 55px;text-align: center;}
    .step-btn{float: right;margin-bottom: 10px;}
</style>

<script>
    import {getTask,nextProcess,getModel,cancelTask,recoverTask,getInsTypes} from '../../../api/api';
    export default {
        data () {
            return {
                active: 0,//步骤
                activeName: '1',
                modelList:[],//车型列表
                modelLoading:false,//车型
                insTypeInfo:[],//保险项目接口返回数据
                insuranceItems:[],//保险项目多选列取出需要数据
                insupolicydetail:[],//存储选中保险项目需要提交到后台的信息
                values:[],//所选项目的id组
                addFormRules:{},
                addForm:{
                            custname:'',
                            custmobile:'',
                            employeename:'',
                            depositamount:'',
                            orderdate:'',
                            vehiclehandoverdate:'',
                            deposittype:'',
                            paymentmode:'',
                            vehicleid:'',
                },
                 insuVehiclepolicy:{//保险信息
                            id:'',
                            holder:'',
                            holdermobile:'',
                            policynumber:'',
                            insurancecorp:'',
                            insureddate:'',
                            vehicleid:'',
                },
                vehicleInfo:{//车辆信息
                            id:'',
                            model:'',
                            vin:'',
                            color:'',
                            enginenum:'',
                            price:'',
                            licenseplatenum:'',
                },
            }
        },
        methods: {
            // 下一步
            next () {
                if (this.active == 5) {
                    this.active = 0;
                } else {
                    this.active += 1;
                }
            },
            //获取保单列表
            handleQuery() {
                let para = {
                    id_:this.$route.params.row.id
                }
                getTask(para).then((res) => {
                    if (res.data.result.code == 0) {
                            this.addForm = res.data.data;
                            this.vehicleInfo = res.data.data.vehicleInfo;//车辆信息
                            this.insuVehiclepolicy = res.data.data.insuVehiclepolicy;//保险信息
                            
                    }
                });
                // 保险项目接口
                getInsTypes().then((res) => {
                    if (res.data.result.code == 0) {
                        this.insTypeInfo = res.data.data.records;
                        this.insTypeInfo.forEach((items,index)=>{
                         this.insuranceItems.push({
                            check:[],
                            index:index,
                            insuranceid:items.id,
                            insuranceitem:items.insuranceitem,
                            premium:items.amountinsured,
                         });
                         this.insTypeInfo[index].label = items.insuranceitem + '：' + items.amountinsured + '元';
                         this.insTypeInfo[index].value = items.id;
                        });
                    }
                });
            },

            // 点击提交按钮
            addSubmit: function () {
                    // 保险项目多选组
                    this.values.forEach((item2,index2)=>{//判断当前选择的项目的id是否存在
                        this.insuranceItems.forEach((item,index)=>{
                                if (item2 == item.insuranceid) {//已存在
                                    this.insupolicydetail.push({
                                        insuranceid:item.insuranceid,
                                        premium:item.premium,
                                        insuranceitem:item.insuranceitem
                                    });
                                }
                        });
                    });
                    let para = {
                                id_:this.$route.query.id ? this.$route.query.id : this.args,
                                id:this.addForm.id,
                                processInstanceId:this.addForm.processInstanceId,//取消订单ID
                                depositamount:this.addForm.depositamount,
                                orderdate:this.addForm.orderdate,
                                vehiclehandoverdate:this.addForm.vehiclehandoverdate,
                                vehicleInfo:{//车辆信息
                                        id:this.vehicleid,
                                        model:this.vehicleInfo.model,
                                        vin:this.vehicleInfo.vin,
                                        color:this.vehicleInfo.color,
                                        enginenum:this.vehicleInfo.enginenum,
                                        price:this.vehicleInfo.price,
                                        licenseplatenum:this.vehicleInfo.licenseplatenum,
                                },
                                deposittype:this.addForm.deposittype,
                                paymentmode:this.addForm.paymentmode,
                                vehicleid:this.addForm.vehicleid,
                                insuVehiclepolicy:{//保险信息
                                        id:this.addForm.insu_id,
                                        holder:this.addForm.custname,
                                        holdermobile:this.addForm.custmobile,
                                        policynumber:this.insuVehiclepolicy.policynumber,
                                        insurancecorp:this.insuVehiclepolicy.insurancecorp,
                                        insureddate:this.insuVehiclepolicy.insureddate,
                                        vehicleid:this.addForm.vehicleid,
                                        insupolicydetail:this.insupolicydetail,  // 保险项目存入保险组
                                    },
                                }
                                nextProcess(para).then((res) => {
                                    if (res.data.result.code == 0) {
                                           this.$router.push({path:'/finishProcess',query:{id:res.data.data}});
                                    }
                                });
            },
            // 取消订单-恢复订单 按钮事件
            cancelTask(){
                let para = {processInstanceId:this.addForm.processInstanceId}
                if (this.addForm.order_type < 0) {//订单已经取消时，调用恢复订单接口
                    recoverTask(para).then((res) => {
                            if (res.data.result.code == 0) {
                                this.$message.success(res.data.data.result);
                                this.addForm.order_type = 2;
                                this.handleQuery();
                            }
                        });
                }else{//未取消订单，调用取消订单接口
                        cancelTask(para).then((res) => {
                            if (res.data.result.code == 0) {
                                this.$message.success(res.data.data.result);
                                this.$router.push({path:'/cancelProcess',query:{id:this.addForm.id_}});
                            }
                        });
                }
            },
            /*车型——下拉*/
            modelChange:function(r){
                if(!r || this.modelList.length > 0) return;
                this.modelLoading = true;
                getModel().then((res) => {
                    if(res.data.result.code == 0){
                         this.modelList = res.data.data.records;
                         this.modelLoading = false;
                    }
                });
            },
            // 车型，远程搜索
            modelChangeSelect:function(query){
                let para = {
                    showCount:100,
                    searchKey:query,
                }
                this.modelLoading = true;
                getModel(para).then((res) => {
                    this.modelList = res.data.data.records;
                    this.modelLoading = false;
                });
            },
        },
        //初始化数据
        created() {
            this.handleQuery();
        }
    }
</script>