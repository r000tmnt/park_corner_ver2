import axios from '../server/axios'

export const state = () => ({
    types: []
})

export const getters = {
    getCommissionType(state: any){
        return state.types
    }
}

export const mutations = {
    setTypes(state: any, type: []){
        state.types = type
    }
}

export const actions = {
    async getCommissionType(ctx: any){
        const types = await axios.get('/commission/getType')

        console.log('types :>>>', types)

        ctx.commit('setTypes', types)
    }
}