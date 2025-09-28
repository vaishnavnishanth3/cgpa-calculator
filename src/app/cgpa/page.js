"use client";

import React, { useState } from "react";
import styles from "../page.module.css";

export default function Home() {
    const [subjects, setSubjects] = useState([
        { id: 1, name: "", obtainedScore: "", totalScore: "", credits: "" },
    ]);

    const addSubject = () => {
        setSubjects([
            ...subjects,
            {
                id: subjects.length + 1,
                name: "",
                obtainedScore: "",
                totalScore: "",
                credits: "",
            },
        ]);
    };

    const removeSubject = (id) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter((subject) => subject.id !== id));
        }
    };

    const handleInputChange = (id, field, value) => {
        setSubjects(
            subjects.map((subject) =>
                subject.id === id ? { ...subject, [field]: value } : subject
            )
        );
    };

    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        subjects.forEach((subject) => {
            if (
                subject.obtainedScore &&
                subject.totalScore &&
                subject.credits
            ) {
                const obtained = parseFloat(subject.obtainedScore);
                const total = parseFloat(subject.totalScore);
                const credits = parseFloat(subject.credits);

                if (
                    !isNaN(obtained) &&
                    !isNaN(total) &&
                    !isNaN(credits) &&
                    total > 0
                ) {
                    const gradePoint = (obtained / total) * 10; // Simple grade point calculation
                    totalPoints += gradePoint * credits;
                    totalCredits += credits;
                }
            }
        });

        return totalCredits > 0
            ? (totalPoints / totalCredits).toFixed(2)
            : "0.00";
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Grade Calculator</h1>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Obtained Score</th>
                            <th>Total Score</th>
                            <th>Credits</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, idx) => (
                            <tr key={subject.id}>
                                <td>
                                    <p
                                        className={styles.p}
                                        value={idx}
                                        placeholder='Subject name'
                                    >
                                        {`${idx + 1}`}
                                    </p>
                                </td>
                                <td>
                                    <input
                                        type='number'
                                        value={subject.obtainedScore}
                                        onChange={(e) =>
                                            handleInputChange(
                                                subject.id,
                                                "obtainedScore",
                                                e.target.value
                                            )
                                        }
                                        placeholder='Obtained'
                                    />
                                </td>
                                <td>
                                    <input
                                        type='number'
                                        value={subject.totalScore}
                                        onChange={(e) =>
                                            handleInputChange(
                                                subject.id,
                                                "totalScore",
                                                e.target.value
                                            )
                                        }
                                        placeholder='Total'
                                    />
                                </td>
                                <td>
                                    <input
                                        type='number'
                                        value={subject.credits}
                                        onChange={(e) =>
                                            handleInputChange(
                                                subject.id,
                                                "credits",
                                                e.target.value
                                            )
                                        }
                                        placeholder='Credits'
                                    />
                                </td>
                                <td>
                                    <button
                                        className={styles.button}
                                        onClick={() =>
                                            removeSubject(subject.id)
                                        }
                                        disabled={subjects.length <= 1}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.actions}>
                    <button className={styles.button} onClick={addSubject}>
                        Add Subject
                    </button>
                    <div className={styles.result}>
                        <strong>GPA: {calculateGPA()}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
