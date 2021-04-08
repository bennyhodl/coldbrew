import Head from "next/head";
import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import FeedModule from "../../modules/Feed.module";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import { Observer, ColdBrew } from "../../util/constants";

const fetcher = (url) => axios.get(url).then((r) => r.data);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let params = new URL(location).searchParams;
    const token = params.get("access_token");
    if (token) {
      localStorage.setItem("sc_token", token);
    } else if (!token) {
      /**
       * TODO FIX AUTH
       */
      router.push("/beta/home");
    }
  }, []);
  const banner = {
    title: "Home",
    about: "All posts from the beta testers of Cold Brew.",
  };
  const { data, error } = useSWR(
    `/api/hive/rankedposts?sort=created&tag=${ColdBrew}&observer=${Observer}`,
    fetcher
  );

  return (
    <>
      <Head>
        <title>Cold Brew | monetizing clout.</title>
      </Head>
      <FeedModule data={data} loading={!data} banner={banner} error={error} />
    </>
  );
}