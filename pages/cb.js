import Head from "next/head";
import { useSession } from "next-auth/client";
import axios from "axios";
import useSWR from "swr";
import FeedModule from "../modules/Feed.module";

import { ColdBrewAcc } from "../util/constants";

const fetcher = (url) => axios.get(url).then((r) => r.data);

const coldbrew = () => {
  const banner = {
    title: "Cold Brew",
    about: "All posts from the Cold Brew account.",
  };
  const [session, loading] = useSession();
  const { data, error } = useSWR(
    `api/hive/following?sort=posts&account=${ColdBrewAcc}&limit=10`,
    fetcher
  );
  return (
    <>
      <Head>
        <title>grab a coffee, stay a while</title>
      </Head>
      <FeedModule
        session={session}
        loading={loading}
        data={data}
        banner={banner}
        error={error}
      />
    </>
  );
};

export default coldbrew;
