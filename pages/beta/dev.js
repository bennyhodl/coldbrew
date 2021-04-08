import Head from "next/head";
import axios from "axios";
import useSWR from "swr";
import FeedModule from "../../modules/Feed.module";
import Loading from "../../components/Loading";
import { Observer } from "../../util/constants";

const fetcher = (url) => axios.get(url).then((r) => r.data);

const dev = () => {
  const banner = {
    title: "Developer Notes",
    about:
      "Updates on bug fixes, new features, and release notes from the Cold Brew developer team.",
  };
  const { data, error } = useSWR(
    `/api/hive/rankedposts?sort=created&tag=coldbrew-dev&observer=${Observer}`,
    fetcher
  );
  return (
    <>
      <Head>
        <title>dev log</title>
      </Head>
      <FeedModule data={data} loading={!data} banner={banner} error={error} />
    </>
  );
};

export default dev;
