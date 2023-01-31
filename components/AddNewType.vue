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
                @click="$emit('close', !addNewType)"
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
                                v-if="alert"
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
                                ></v-img>
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
                    <v-row style="margin-top: 1%">
                        <v-col cols="12">

                            <v-card v-for="(vari, index) in variation" v-bind:key="index"></v-card>

                            <v-btn block>新增類型變化</v-btn>

                            <center v-if="variation.length == 0" style="margin: 3% 0">想想可以有什麼變化</center>

                        </v-col>

                    </v-row>

                    <div class="next_Step_wrapper">
                        <v-btn color="primary" @click="fieldCheck">Next</v-btn>                    
                    </div>
                </v-form>

            </v-stepper-content>            
        </v-stepper-items>
      </v-stepper>

    </v-dialog>
</template>

<script>

export default {
    props: {
        addNewType: Boolean
    },
    data(){
        return {
            step: 1,
            alert: false,
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
                accept: value => this.type_acceptable > 0 || value > 0 || 'Need a number above 0',
                base_price: value => this.type_price >= 300 || value >= 300 || 'Need a number above 300',
            }
        }
    },
    computed: {
        form(){
            return {
                zh_name: this.type_name_zh,
                eng_name: this.type_name_eng,
                images: this.newImages,
                acceptable: this.type_acceptable,
                price: this.type_price
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
                    this.alert = true

                    setTimeout(() => {
                        this.alert = false
                    }, 1000)

                    break
                }else{
                    this.newImages.push(files[i])
                    this.thumbnails.push(URL.createObjectURL(files[i]))

                    // this.alert = false
                }
            }
        },

        fieldCheck(){

            let matchRules

            switch(this.step){
                case 1:
                    matchRules = this.$refs.step_1.validate()
                    // console.log('matchRules :>>>', matchRules)
                    if(matchRules) this.step = 2
                return;
            }

        }
    }
}
</script>
