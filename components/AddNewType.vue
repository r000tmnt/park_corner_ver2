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
                <v-row>
                    <v-col cols="12" sm="12" md="6">
                        <!-- <label for="name">
                            <span class="require">*</span>
                            名稱
                        </label> -->
                        <v-text-field
                            label="Name"
                            placeholder="名稱"
                            outlined
                        >
                        </v-text-field>

                        <v-text-field
                            label="Acceptable"
                            placeholder="接受數量"
                            type="number"
                            outlined
                        >
                        </v-text-field>

                        <v-text-field
                            label="Price"
                            placeholder="起始價格"
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
                    <v-btn color="primary" @click="step=2">Next</v-btn>                    
                </div>

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
            thumbnails: []
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
        }
    }
}
</script>
