import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  producers: [],
};

export const producerslice = createSlice({
  name: "producer",
  initialState,
  reducers: {
    getProducer: (state, action) => {

      state.producers = action.payload;
    },

    addProducer: (state, action) => {
      const producer = {
        id: Math.random() * 100,
        cpf: action.payload.cpf,
        open: action.payload.open,
        culture: action.payload.culture,
      };
     
      state.producers.push(producer);
    },

    editProducer: (state, action) => {
      const indexForEdit =  state.producers.findIndex((producer) => producer.cpf ===  action.payload.cpf)

      state.producers[indexForEdit] = {
        ...state.producers[indexForEdit],
        ...action.payload
      }
    },
    
    removeProducer: (state, action) => {
      state.producers = state.producers.filter((producer) => producer.cpf !== action.payload.cpf);
    },
  },
});

export const { addProducer, removeProducer, editProducer, getProducer } = producerslice.actions;

export default producerslice.reducer;