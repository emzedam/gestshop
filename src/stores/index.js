import { createStore } from 'vuex'
import api from '@/axios'

const store = createStore({
    state (){
        return {
            authuser: null,
            authadmin: null
        }
    },

    mutations: {
        set_user_info_with_token(state , userData){
            state.authuser = userData
        },
        set_admin_info_with_token(state , adminData){
            state.authadmin = adminData
        },
    },

    actions: {

        async send_otp(context , registerData){
            const {data} = await api.post("/users/otp" , registerData, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }

        },

        async verify_otp_code_and_register(context , userData){
            const {data} = await api.post("/users/login" , userData, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }

        },

        async do_user_logout(context , userToken){
            const {data} = await api.post("/users/logout" , {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+ userToken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                context.commit("set_user_info_with_token" , null)
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async login_with_password(context , loginData){
            const {data} = await api.post("/users/login-pass" , loginData, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async get_level_request(context , userData){
            const {data} = await api.get("/users/agsat/check-level" , {
                headers: {
                    "Content-Type"  : "application/json",
                    "Authorization" : "Bearer "+ userData.token
                },
                params: {
                    bank_name: userData.bank_name
                }
            }).catch((err) => {
                console.log(err.response.data)
            })            

            return data
        },

        async pay_to_bank(context , requestData){
            const {data} = await api.post("/users/agsat/connect-to-bank" , {} , {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+ requestData.token
                }
            }).catch((err) => {
                console.log(err.response.data)
            })            

            return data
        },

        async do_user_edit_request(context , requestData){
            const {data} = await api.post("/users/agsat/edit" , {id:requestData.id, editedData: requestData.data} , {
                headers: {
                    Authorization: "Bearer "+ requestData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })            

            return data
        },

        async admin_login_with_password(context , loginData){
            const {data} = await api.post("/admins/login-pass" , loginData, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async do_admin_logout(context , adminToken){
            const {data} = await api.post("/admins/logout" , {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+ adminToken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                context.commit("set_admin_info_with_token" , null)
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async get_user_credentials(context , adminToken){
            const {data} = await api.get("/admins/requests/all" , {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+ adminToken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async get_request_details_by_id(context , requestData){
            const {data} = await api.get("/admins/requests/get-by-id" , {
                params: {id: requestData.id},
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+ requestData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async do_upload_file(context , uploadData){
            let formData = new FormData()
            formData.append("formfile" , uploadData.file)
            const {data} = await api.post("/admins/requests/upload-file" , formData , {
                headers: {
                    Authorization: "Bearer "+ uploadData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async get_has_already_file(context , token){
            const {data} = await api.get("/admins/requests/has-already-file" , {
                headers: {
                    Authorization: "Bearer "+ token
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async remove_alredy_file(context , token){
            const {data} = await api.post("/admins/requests/remove-already-file" , {} , {
                headers: {
                    Authorization: "Bearer "+ token
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async verify_request_data(context , requestData) {
            const {data} = await api.post("/admins/requests/verify" , {id: requestData.requetId} , {
                headers: {
                    Authorization: "Bearer "+ requestData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },


        async reject_request_data(context , requestData) {
            const {data} = await api.post("/admins/requests/reject" , {id: requestData.requetId , reject_desc: requestData.reject_desc} , {
                headers: {
                    Authorization: "Bearer "+ requestData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async send_madarek_files(context , madarekFiles){
            let formData = new FormData()

            if(madarekFiles.madarek.cartMelliZamen.length != 0){
                madarekFiles.madarek.cartMelliZamen.forEach((val , index) => {
                    formData.append("cartMelliZamen["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.factorFrush.length != 0){
                madarekFiles.madarek.factorFrush.forEach((val , index) => {
                    formData.append("factorFrush["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.fishVarizi.length != 0){
                madarekFiles.madarek.fishVarizi.forEach((val , index) => {
                    formData.append("fishVarizi["+index+"]" , val)
                })
            }

            
            if(madarekFiles.madarek.hoviyatiFile.length != 0){
                madarekFiles.madarek.hoviyatiFile.forEach((val , index) => {
                    formData.append("hoviyatiFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.etebarsanjiAys.length != 0){
                madarekFiles.madarek.etebarsanjiAys.forEach((val , index) => {
                    formData.append("etebarsanjiAys["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.printSeMaheFile.length != 0){
                madarekFiles.madarek.printSeMaheFile.forEach((val , index) => {
                    formData.append("printSeMaheFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.checkSayadiFile.length != 0){
                madarekFiles.madarek.checkSayadiFile.forEach((val , index) => {
                    formData.append("checkSayadiFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.bargeSanaFile.length != 0){
                madarekFiles.madarek.bargeSanaFile.forEach((val , index) => {
                    formData.append("bargeSanaFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.checkSefidFile.length != 0){
                madarekFiles.madarek.checkSefidFile.forEach((val , index) => {
                    formData.append("checkSefidFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.skunatiFile.length != 0){
                madarekFiles.madarek.skunatiFile.forEach((val , index) => {
                    formData.append("skunatiFile["+index+"]" , val)
                })
            }


            if(madarekFiles.madarek.madarekShoghliFile.length != 0){
                madarekFiles.madarek.madarekShoghliFile.forEach((val , index) => {
                    formData.append("madarekShoghliFile["+index+"]" , val)
                })
            }


            if(madarekFiles.madarek.check75File.length != 0){
                madarekFiles.madarek.check75File.forEach((val , index) => {
                    formData.append("check75File["+index+"]" , val)
                })
            }


            if(madarekFiles.madarek.mostanadatKasbokarFile.length != 0){
                madarekFiles.madarek.mostanadatKasbokarFile.forEach((val , index) => {
                    formData.append("mostanadatKasbokarFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.addedOneFile.length != 0){
                madarekFiles.madarek.addedOneFile.forEach((val , index) => {
                    formData.append("addedOneFile["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.addedTwoFile.length != 0){
                madarekFiles.madarek.addedTwoFile.forEach((val , index) => {
                    formData.append("addedTwoFile["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.addedThreeFile.length != 0){
                madarekFiles.madarek.addedThreeFile.forEach((val , index) => {
                    formData.append("addedThreeFile["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.addedFourFile.length != 0){
                madarekFiles.madarek.addedFourFile.forEach((val , index) => {
                    formData.append("addedFourFile["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.addedFiveFile.length != 0){
                madarekFiles.madarek.addedFiveFile.forEach((val , index) => {
                    formData.append("addedFiveFile["+index+"]" , val)
                })
            }

            // zamen
            if(madarekFiles.madarek.zamenAvalCartmelliFile.length != 0){
                madarekFiles.madarek.zamenAvalCartmelliFile.forEach((val , index) => {
                    formData.append("zamenAvalCartmelliFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.zamenAvalFishHogugiFile.length != 0){
                madarekFiles.madarek.zamenAvalFishHogugiFile.forEach((val , index) => {
                    formData.append("zamenAvalFishHogugiFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.zamenDovomCartmelliFile.length != 0){
                madarekFiles.madarek.zamenDovomCartmelliFile.forEach((val , index) => {
                    formData.append("zamenDovomCartmelliFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.zamenAvalMadrakShoghliFile.length != 0){
                madarekFiles.madarek.zamenAvalMadrakShoghliFile.forEach((val , index) => {
                    formData.append("zamenAvalMadrakShoghliFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.zamenAvalMoadelSeMaheFile.length != 0){
                madarekFiles.madarek.zamenAvalMoadelSeMaheFile.forEach((val , index) => {
                    formData.append("zamenAvalMoadelSeMaheFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.zamenDovomMadrakShoghliFile.length != 0){
                madarekFiles.madarek.zamenDovomMadrakShoghliFile.forEach((val , index) => {
                    formData.append("zamenDovomMadrakShoghliFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.zamenDovomMoadelSeMaheFile.length != 0){
                madarekFiles.madarek.zamenDovomMoadelSeMaheFile.forEach((val , index) => {
                    formData.append("zamenDovomMoadelSeMaheFile["+index+"]" , val)
                })
            }


            formData.append("request_amount" , madarekFiles.gestDetail.request_amount)
            formData.append("return_period" , madarekFiles.gestDetail.return_period)
            formData.append("payment_step" , madarekFiles.gestDetail.payment_step)
            formData.append("monthly_payment" , madarekFiles.gestDetail.monthly_payment)
            formData.append("total_Interest" , madarekFiles.gestDetail.total_Interest)
            formData.append("total_payment" , madarekFiles.gestDetail.total_payment)
            formData.append("bank_name" , madarekFiles.madarek.bank_name)

            



            const {data} = await api.post("/users/agsat/upload-madarek" , formData , {
                headers: {
                    Authorization: "Bearer "+ madarekFiles.utoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async update_madarek_files(context , madarekFiles){
            let formData = new FormData()
            


            if(madarekFiles.madarek.cartMelliZamen.length != 0){
                madarekFiles.madarek.cartMelliZamen.forEach((val , index) => {
                    formData.append("cartMelliZamen["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.factorFrush.length != 0){
                madarekFiles.madarek.factorFrush.forEach((val , index) => {
                    formData.append("factorFrush["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.fishVarizi.length != 0){
                madarekFiles.madarek.fishVarizi.forEach((val , index) => {
                    formData.append("fishVarizi["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.hoviyatiFile.length != 0){
                madarekFiles.madarek.hoviyatiFile.forEach((val , index) => {
                    formData.append("hoviyatiFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.etebarsanjiAys.length != 0){
                madarekFiles.madarek.etebarsanjiAys.forEach((val , index) => {
                    formData.append("etebarsanjiAys["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.printSeMaheFile.length != 0){
                madarekFiles.madarek.printSeMaheFile.forEach((val , index) => {
                    formData.append("printSeMaheFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.checkSayadiFile.length != 0){
                madarekFiles.madarek.checkSayadiFile.forEach((val , index) => {
                    formData.append("checkSayadiFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.bargeSanaFile.length != 0){
                madarekFiles.madarek.bargeSanaFile.forEach((val , index) => {
                    formData.append("bargeSanaFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.checkSefidFile.length != 0){
                madarekFiles.madarek.checkSefidFile.forEach((val , index) => {
                    formData.append("checkSefidFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.skunatiFile.length != 0){
                madarekFiles.madarek.skunatiFile.forEach((val , index) => {
                    formData.append("skunatiFile["+index+"]" , val)
                })
            }


            if(madarekFiles.madarek.madarekShoghliFile.length != 0){
                madarekFiles.madarek.madarekShoghliFile.forEach((val , index) => {
                    formData.append("madarekShoghliFile["+index+"]" , val)
                })
            }


            if(madarekFiles.madarek.check75File.length != 0){
                madarekFiles.madarek.check75File.forEach((val , index) => {
                    formData.append("check75File["+index+"]" , val)
                })
            }


            if(madarekFiles.madarek.mostanadatKasbokarFile.length != 0){
                madarekFiles.madarek.mostanadatKasbokarFile.forEach((val , index) => {
                    formData.append("mostanadatKasbokarFile["+index+"]" , val)
                })
            }

            if(madarekFiles.madarek.addedOneFile.length != 0){
                madarekFiles.madarek.addedOneFile.forEach((val , index) => {
                    formData.append("addedOneFile["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.addedTwoFile.length != 0){
                madarekFiles.madarek.addedTwoFile.forEach((val , index) => {
                    formData.append("addedTwoFile["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.addedThreeFile.length != 0){
                madarekFiles.madarek.addedThreeFile.forEach((val , index) => {
                    formData.append("addedThreeFile["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.addedFourFile.length != 0){
                madarekFiles.madarek.addedFourFile.forEach((val , index) => {
                    formData.append("addedFourFile["+index+"]" , val)
                })
            }
            if(madarekFiles.madarek.addedFiveFile.length != 0){
                madarekFiles.madarek.addedFiveFile.forEach((val , index) => {
                    formData.append("addedFiveFile["+index+"]" , val)
                })
            }
            

            const {data} = await api.post("/users/agsat/update-upload-madarek" , formData , {
                headers: {
                    Authorization: "Bearer "+ madarekFiles.utoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async get_contract_details(context , contractData){
            const {data} = await api.get("/admins/contract/get-by-id" , {
                params: {id: contractData.id},
                headers: {
                    Authorization: "Bearer "+ contractData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async verify_madarek_data(context , madarekData){
            const {data} = await api.post("/admins/madarek/verify" , {id: madarekData.requetId} , {
                headers: {
                    Authorization: "Bearer "+ madarekData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async reject_madarek_data(context , madarekData){
            const {data} = await api.post("/admins/madarek/reject" , {id: madarekData.requetId , reject_desc: madarekData.reject_desc} , {
                headers: {
                    Authorization: "Bearer "+ madarekData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async create_check_dates(context , checkData){
            const {data} = await api.post("/admins/checks/specific-date" , {id: checkData.requetId , checks: checkData.checks} , {
                headers: {
                    Authorization: "Bearer "+ checkData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async get_check_date_details(context , checkData){
            const {data} = await api.get("/admins/checks/get-detail" , {
                params: {id: checkData.requetId},
                headers: {
                    Authorization: "Bearer "+ checkData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async do_upload_checks(context , checkData){
            let formData = new FormData();
            for (let i = 0; i < checkData.checks.length; i++) {
                if(checkData.checks[i].file != null){
                    formData.append("checks["+i+"][title]" , checkData.checks[i].title)
                    formData.append("checks["+i+"][date]" , checkData.checks[i].date)
                    formData.append("checks["+i+"][amount]" , checkData.checks[i].amount)
                    formData.append("checks["+i+"][file]" , checkData.checks[i].file)
                    formData.append("checks["+i+"][index]" , checkData.checks[i].index)
                }
            }

            const {data} = await api.post("/users/agsat/upload-checks" , formData , {
                headers: {
                    Authorization: "Bearer "+ checkData.utoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async verify_checks_data(context , checksData){
            const {data} = await api.post("/admins/checks/verify" , {id: checksData.requetId} , {
                headers: {
                    Authorization: "Bearer "+ checksData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async reject_checks_data(context , checksData){
            const {data} = await api.post("/admins/checks/reject" , {id: checksData.requetId , reject_desc: checksData.reject_desc} , {
                headers: {
                    Authorization: "Bearer "+ checksData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async verify_contracts_data(context , contractData){
            const {data} = await api.post("/admins/contract/verify" , {id: contractData.requetId} , {
                headers: {
                    Authorization: "Bearer "+ contractData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async reject_contracts_data(context , contractData){
            const {data} = await api.post("/admins/contract/reject" , {id: contractData.requetId , reject_desc: contractData.reject_desc} , {
                headers: {
                    Authorization: "Bearer "+ contractData.atoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async get_downloaded_form(context , formData){
            const {data} = await api.get("/users/get-form" , {
                headers: {
                    Authorization: "Bearer "+ formData.utoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        },

        async do_upload_form_contract(context , uploadData){
            let formData = new FormData();
            if(uploadData.form_check.form_one != null){
                formData.append("form_one" , uploadData.form_check.form_one)
            }

            if(uploadData.form_check.form_two != null){
                formData.append("form_two" , uploadData.form_check.form_two)
            }


            if(uploadData.form_check.form_three != null){
                formData.append("form_three" , uploadData.form_check.form_three)
            }

            if(uploadData.form_check.form_four != null){
                formData.append("form_four" , uploadData.form_check.form_four)
            }

            if(uploadData.form_check.form_five != null){
                formData.append("form_five" , uploadData.form_check.form_five)
            }

            if(uploadData.form_check.form_six != null){
                formData.append("form_six" , uploadData.form_check.form_six)
            }

            if(uploadData.form_check.form_seven != null){
                formData.append("form_seven" , uploadData.form_check.form_seven)
            }

            if(uploadData.form_check.form_eight != null){
                formData.append("form_eight" , uploadData.form_check.form_eight)
            }

            if(uploadData.form_check.form_nine != null){
                formData.append("form_nine" , uploadData.form_check.form_nine)
            }

            if(uploadData.form_check.form_ten != null){
                formData.append("form_ten" , uploadData.form_check.form_ten)
            }


            const {data} = await api.post("/users/agsat/upload-contracts" , formData , {
                headers: {
                    Authorization: "Bearer "+ uploadData.utoken
                }
            }).catch((err) => {
                console.log(err.response.data)
            })

            if(data){
                return data
            }else{
                return {statusCode: 400}
            }
        }

        

    },

    getters: {
        get_authuser(state){
            return state.authuser
        },
        get_authadmin(state){
            return state.authadmin
        }
    }
})


export default store