  export function capitalizeWordsList(arr: any[]): any[] {
    return arr.map((word) => {
      return  capitalizeWords(word);
    });
}
  
  export function capitalizeWords(word: any): string {
      const firstLetter = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();
      return firstLetter + rest;
  }