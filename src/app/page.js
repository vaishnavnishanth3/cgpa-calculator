import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Welcome to the Student Portal</h1>
            <p className={styles.p}>
                Calculate your CGPA and track your academic progress
            </p>
            <Link href='/cgpa'>
                <button className={`${styles.button} ${styles.navButton}`}>Calculate CGPA</button>
            </Link>
        </div>
    );
}
