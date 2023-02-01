<template>
    <v-dialog 
      v-model="addNewType"
      max-width="80%"
      persistent
    >

      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step
            :complete="step > 1"
            step="1"
          >
            Basic info
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="step > 2"
            step="2"
          >
            Variation
          </v-stepper-step>
          
          <v-divider></v-divider> 
          
          <v-stepper-step
            :complete="step > 3"
            step="3"
          >
            Description
          </v-stepper-step>   

            <v-btn 
                icon
                class="close_btn"
                @click="$emit('close')"
            >
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>                          

        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <v-form ref="step_1">
                    <v-row style="margin-top: 1%">
                        <v-col cols="12" sm="12" md="6">

                            <v-text-field
                                label="Name(ZH)"
                                placeholder="中文名稱"
                                :rules="[rules.zh_required]"
                                v-model="type_name_zh"
                                outlined
                            >
                            </v-text-field>

                            <v-text-field
                                label="Name(ENG)"
                                placeholder="英文名稱"
                                :rules="[rules.eng_required]"
                                v-model="type_name_eng"
                                outlined
                            >
                            </v-text-field>

                            <v-text-field
                                label="Acceptable"
                                placeholder="接受數量"
                                :rules="[rules.accept]"
                                v-model="type_acceptable"
                                type="number"
                                outlined
                            >
                            </v-text-field>

                            <v-text-field
                                label="Price"
                                placeholder="起始價格"
                                :rules="[rules.base_price]"
                                v-model="type_price"
                                type="number"
                                outlined
                            >
                            </v-text-field>


                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                            <v-btn 
                                class="upload_btn"
                                @click="onUploadBtnClick"
                                block
                            >
                                <v-icon>
                                    mdi-upload
                                </v-icon>
                                Click to upload (up to 5 images)
                            </v-btn>

                            <v-alert
                                text
                                v-if="img_alert"
                                type="error"
                            >
                                Reached file limit
                            </v-alert>

                            <input 
                                ref="imgUploader"
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                @change="onFileChange"
                            >


                            <div class="flex preview_upload_wrapper">
                                <v-img 
                                    v-for="(img, index) in newImages"
                                    v-bind:key="index"
                                    max-width="100"
                                    max-height="100"
                                    :src="thumbnails[index]"
                                    class="preview_upload"
                                >
                                    <v-btn 
                                        style="float: right"
                                        @click="removeImage(index)"
                                        icon
                                    >
                                        <v-icon>
                                            mdi-close
                                        </v-icon>
                                    </v-btn>                                
                                </v-img>
                            </div>
                        </v-col>

                    </v-row>

                    <div class="next_Step_wrapper">
                        <v-btn color="primary" @click="fieldCheck">Next</v-btn>                    
                    </div>
                </v-form>

            </v-stepper-content>

            <v-stepper-content step="2">
                <v-form ref="step_2">
                    <v-row>
                        <v-col cols="12">

                            <v-btn block color="blue-grey" @click="addNewVariation">新增類型變化</v-btn>

                            <v-card class="card" v-for="(vari, index) in variation" v-bind:key="index">
                                
                                <v-row>
                                    <v-col cols="12" >

                                        <span>類型變化</span>

                                        <v-btn 
                                            icon
                                            class=""
                                            style="float: right"
                                            @click="removeVariation(index)"
                                        >
                                            <v-icon>
                                                mdi-close
                                            </v-icon>
                                        </v-btn>                                          
                                    </v-col>                                    
                                </v-row>

                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                            label="中文名稱"
                                            :rules="[value => vari.zh_name.length > 0 || !!value || 'Required']"
                                            v-model="vari.zh_name"
                                            outlined                                    
                                        ></v-text-field>

                                        <v-text-field
                                            label="英文名稱"
                                            :rules="[value => vari.zh_name.length > 0 || !!value || 'Required']"
                                            v-model="vari.eng_name"
                                            outlined                                   
                                        ></v-text-field>
                                            
                                    </v-col>

                                    <v-col cols="6">
                                        
                                        <v-text-field
                                            label="價格"
                                            :rules="[
                                                value => vari.price < type_price || 
                                                !!value || value < type_price ||
                                                'Required'
                                            ]"
                                            v-model="vari.price"
                                            :value="vari.price || type_price"
                                            type="number"
                                            outlined                                   
                                        ></v-text-field>                                         
                                    </v-col>

                                    <v-col cols="12">
                                        <v-textarea 
                                            v-model="vari.zh_desc"
                                            label="中文說明"
                                            :rules="[value => vari.zh_desc.length > 0 || !!value || 'Required']"
                                            outlined
                                        ></v-textarea>

                                        <v-textarea 
                                            v-model="vari.eng_desc"
                                            label="英文說明"
                                            :rules="[value => vari.eng_desc.length > 0 || !!value || 'Required']"
                                            outlined
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <center v-if="variation.length == 0" style="margin: 3% 0">想想可以有什麼變化</center>

                        </v-col>

                    </v-row>

                    <div class="next_Step_wrapper">
                        <v-btn color="primary" @click="fieldCheck">Next</v-btn>                    
                    </div>
                </v-form>

            </v-stepper-content>     

            <v-stepper-content step="3">
                <v-form ref="step_3">
                    <v-row>
                        <v-col cols="12">
                            <v-textarea 
                                v-model="zh_desc"
                                label="中文說明"
                                :rules="[value => zh_desc.length > 0 || !!value || 'Required']"
                                outlined
                            ></v-textarea>

                            <v-textarea 
                                v-model="eng_desc"
                                label="英文說明"
                                :rules="[value => eng_desc.length > 0 || !!value || 'Required']"
                                outlined
                            ></v-textarea>
                        </v-col>
                    </v-row>

                    <div class="next_Step_wrapper">
                        <v-btn color="primary" @click="fieldCheck">Submit</v-btn>                    
                    </div>
                </v-form>

            </v-stepper-content> 

        </v-stepper-items>
      </v-stepper>

    </v-dialog>
</template>

<script>
import axios from '../server/axios.ts'

export default {
    props: {
        addNewType: Boolean
    },
    data(){
        return {
            step: 1,
            img_alert: false,
            newImages: [],
            thumbnails: [],
            type_name_zh: '',
            type_name_eng: '',
            type_acceptable: 1,
            type_price: 300,
            variation: [
                // { zh_name: '', eng_name: '', price: 300, zh_desc: '', eng_desc: '' }
            ],
            zh_desc: '',
            eng_desc: '',
            rules: {
                zh_required: value => this.type_name_zh.length > 0 || !!value || 'Required',
                eng_required: value => this.type_name_eng.length > 0 || !!value || 'Required',
                zh_desc_required: value => this.zh_desc.length > 0 || !!value || 'Required',
                eng_desc_required: value => this.eng_desc.length > 0 || !!value || 'Required',
                accept: value => this.type_acceptable > 0 || value > 0 || 'Need a number above 0',
                base_price: value => this.type_price >= 300 || value >= 300 || 'Need a number above 300',
            }
        }
    },
    methods: {
        onUploadBtnClick(){
            this.$refs.imgUploader.click()
        },

        onFileChange(e){
            console.log(e.target.files)

            const files = e.target.files

            for(let i=0; i < files.length; i++){
                if(this.newImages.length == 5){
                    this.img_alert = true

                    setTimeout(() => {
                        this.img_alert = false
                    }, 1000)

                    break
                }else{
                    this.newImages.push(files[i])
                    this.thumbnails.push(URL.createObjectURL(files[i]))
                }
            }
        },

        removeImage(index){
            this.newImages.splice(index, 1)
            this.thumbnails.splice(index, 1)
        },

        addNewVariation(){

            this.variation.push({
                zh_name: '', 
                eng_name: '', 
                price: this.type_price, 
                zh_desc: '', 
                eng_desc: ''
            })

        },

        removeVariation(index){
            this.variation.splice(index, 1)
        },

        async fieldCheck(){

            let matchRules

            switch(this.step){
                case 1:
                    matchRules = this.$refs.step_1.validate()
                    if(matchRules) this.step = 2
                return;

                case 2:
                    matchRules = this.$refs.step_2.validate()
                    if(matchRules) this.step = 3
                return;
                
                case 3:
                    matchRules = this.$refs.step_3.validate()
                    if(matchRules){
                        let form = new FormData()
                        form.append('zh_name', this.type_name_zh)
                        form.append('eng_name', this.type_name_eng)
                        form.append('acceptable', this.type_acceptable)
                        form.append('price', this.type_price)
                        form.append('images', this.newImages)
                        form.append('variation', this.variation)
                        form.append('zh_desc', this.zh_desc)
                        form.append('eng_desc', this.eng_desc)

                        try {
                            // form submit
                            await axios.post('/commission/add', form)                            
                        } catch (error) {
                            console.log('form_submit_error :>>>', error)   
                        }
                    } 
                return
            }

        }
    }
}
</script>
