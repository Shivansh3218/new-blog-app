import Image from "next/image";
import styles from "./page.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/categoryList";

export default function Home() {
  return (
    <main className={styles.main}>
      <Featured />
      <CategoryList />
    </main>
  );
}
