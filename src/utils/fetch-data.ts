export async function fetchData<T>(url:string): Promise<T> {
  try {
    const res = await fetch(url);
    const resData = (await res.json()) as T;
    return resData;
  } catch (err) {   
    throw err;
  }
}