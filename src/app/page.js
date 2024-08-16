import Image from "next/image";
import styles from "./page.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/categoryList";
import RecentPosts from "@/components/recentPosts/Recent";

export default function Home() {
  return (
    <main className={styles.main}>
      <Featured />
      <RecentPosts/>
      {/* <CategoryList /> */}
    </main>
  );
}
