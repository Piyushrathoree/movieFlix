const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const APPWRITE_ID = import.meta.env.VITE_APPWRITE_ID;
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const updateSearchTerm = async() =>{
    console.log(DB_ID,APPWRITE_COLLECTION_ID,APPWRITE_ID);
    
}