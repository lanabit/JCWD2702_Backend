import { useAuthMutation } from "~/api/useAuthMutation";
import { setCookie } from "~/utils/cookieHelper";
import { setUser } from "~/redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export const useAuthLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: mutationAuth } = useAuthMutation({
    onSuccess: (res) => {
      console.log(res)
      setCookie(res.data.data.accesstoken);
      alert(res.data.message);
      dispatch(
        setUser({
          fullname: res.data.data.fullname,
          imageUrl: res.data.data.imageUrl,
        })
      );
      router.push("/");
    },
    onError: (err) => {
      console.log("login error", err);
    },
  });

  return {
    mutationAuth,
  };
};
