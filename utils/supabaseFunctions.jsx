import { supabase } from "./supabase"

export const getAllRecords = async () => {
  const records = await supabase.from('study-record').select();
  return records.data;
}

export const addRecord = async (record) => {
  const result = await supabase.from('study-record').insert(record);
  return result;
}