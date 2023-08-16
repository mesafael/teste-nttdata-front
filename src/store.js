import { configureStore } from "@reduxjs/toolkit";
 import producerReducer from "./features/producer/producerSlice";

 const store = configureStore({
   reducer: {
     producer: producerReducer,
   },
 });

 export default store;