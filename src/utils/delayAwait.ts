export default async function DelayAwait(time: number) {
    return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}