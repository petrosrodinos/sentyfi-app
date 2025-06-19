import axiosInstance from "./services/api/axios";
import { Button } from "./components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { ApiRoutes } from "./constants/api";
import { CONSOLE_URL } from "./constants";

function App() {
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosInstance.get(`${ApiRoutes.auth.x.create_url}?redirect_url=${CONSOLE_URL}`);
    },
    onSuccess: (data) => {
      window.open(data.data.url, "_blank");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <>
      <Button onClick={() => handleClick()}>Click me</Button>
    </>
  );
}

export default App;
