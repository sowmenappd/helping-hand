export function getBase64(file: any, callback: any): void {
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    callback(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
    callback(null);
  };
}
