import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';import api from '../../services/api';
export const fetchPosts=createAsyncThunk('posts/fetch',async()=> (await api.get('/posts')).data);
export const createPost=createAsyncThunk('posts/create',async(payload)=> (await api.post('/posts',payload)).data);
const slice=createSlice({name:'posts',initialState:{items:[],loading:false,error:null},reducers:{},extraReducers:b=>{b.addCase(fetchPosts.pending,s=>{s.loading=true;s.error=null}).addCase(fetchPosts.fulfilled,(s,a)=>{s.loading=false;s.items=a.payload}).addCase(fetchPosts.rejected,(s,a)=>{s.loading=false;s.error=a.error.message}).addCase(createPost.fulfilled,(s,a)=>{s.items.unshift(a.payload)});}});export default slice.reducer;
