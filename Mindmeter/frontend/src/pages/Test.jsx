import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.css";

const Test = () => {
    const [tests, setTests] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchTests(token);
    }, [navigate]);

    const fetchTests = async (token) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/tests/", {
                headers: { "Authorization": `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch tests");
            const data = await response.json();
            setTests(data);
        } catch (error) {
            setError("Error fetching tests: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchQuestions = async (testId) => {
        setLoading(true);
        setSelectedTestId(testId);
        setError("");
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("Authentication required");
            const response = await fetch(`http://127.0.0.1:8000/api/tests/${testId}/questions/`, {
                headers: { "Authorization": `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch questions");
            const data = await response.json();
            setQuestions(data);
            setSelectedAnswers({});
        } catch (error) {
            setError("Error fetching questions: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionId, option) => {
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

    const handleSubmit = async () => {
        if (!selectedTestId) {
            alert("Please select a test before submitting.");
            return;
        }
    
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("You need to be logged in to submit the test.");
            return;
        }

        const payload = {
            responses: Object.entries(selectedAnswers).map(([questionId, selected_option]) => ({
                question_id: parseInt(questionId),
                selected_option,
            })),
        };

        setLoading(true);
        setError("");
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tests/${selectedTestId}/submit/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Submission failed: ${errorText}`);
            }

            const data = await response.json();
            setScore(data.score);
        } catch (error) {
            setError("Error submitting test: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="test-container">
            <h2>Available Tests</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="test-selection">
                {tests.map((test) => (
                    <div key={test.id} className="test-card" onClick={() => fetchQuestions(test.id)}>
                        <h3>{test.title}</h3>
                    </div>
                ))}
            </div>

            {questions.length > 0 && (
                <div className="questions-container">
                    <h3>Questions</h3>
                    {questions.map((q, index) => (
                        <div key={q.id} className="question-card">
                            <p>{index + 1}/{questions.length}. {q.text}</p>
                            <div className="options">
                                {["A", "B", "C", "D"].map((option) => (
                                    <label key={option} className="option-label">
                                        <input
                                            type="radio"
                                            name={`question-${q.id}`}
                                            value={option}
                                            checked={selectedAnswers[q.id] === option}
                                            onChange={() => handleAnswerSelect(q.id, option)}
                                        />
                                        {q[`option_${option.toLowerCase()}`]}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit Test"}
                    </button>
                </div>
            )}

            {score !== null && (
                <div className="score-container">
                    <h3>Your Score: {score}</h3>
                    <button onClick={() => window.location.reload()} className="retry-btn">Take Another Test</button>
                </div>
            )}
        </div>
    );
};

export default Test;
