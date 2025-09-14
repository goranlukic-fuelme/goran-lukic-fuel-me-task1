export function createLogger (context:string){
  return (message:string)=>{
    console.log(`[${context}] ${message}`);
  };
}