export const revalidateEvent = ({
  defaultShouldRevalidate,
  formAction,
  formMethod,
}) => {
  const shouldRevalidate =
    formAction && formMethod === "delete" ? false : defaultShouldRevalidate;
  console.log(["shouldRevalidateEvent", shouldRevalidate]);
  return shouldRevalidate;
};
