document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.getElementById("comments-container");
    const preloader = document.getElementById("preloader");
    const errorMessage = document.getElementById("error-message");
    const commentForm = document.getElementById("comment-form");
    const commentName = document.getElementById("comment-name");
    const commentBody = document.getElementById("comment-body");

    const COMMENTS_API = "https://jsonplaceholder.typicode.com/comments";

    function loadComments(filterType = "default") {
        commentsContainer.innerHTML = "";
        preloader.style.display = "block";
        errorMessage.style.display = "none";

        let apiUrl = COMMENTS_API;
        if (filterType === "high") {
            apiUrl += "?id_gte=100";
        } else if (filterType === "low") {
            apiUrl += "?id_lte=200";
        }

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка сети");
                }
                return response.json();
            })
            .then((comments) => {
                preloader.style.display = "none";
                renderComments(comments.slice(0, 3));
            })
            .catch((error) => {
                preloader.style.display = "none";
                errorMessage.style.display = "block";
                console.error("Ошибка загрузки:", error);
            });
    }

    function renderComments(comments) {
        comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML =
                `<h3>${comment.name}</h3>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p>${comment.body}</p>`;
            commentsContainer.appendChild(commentElement);
        });
    }

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newComment = {
            name: commentName.value,
            body: commentBody.value,
            email: "user@example.com",
        };

        fetch(COMMENTS_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка при отправке комментария");
                }
                return response.json();
            })
            .then((savedComment) => {
                renderComments([savedComment]);
                commentForm.reset();
            })
            .catch((error) => {
                alert("⚠️ Не удалось отправить комментарий.");
                console.error("Ошибка:", error);
            });
    });

    loadComments();

    // Иногда переключаем фильтр
    setInterval(() => {
        const randomFilter = Math.random() > 0.5 ? "high" : "low";
        loadComments(randomFilter);
    }, 30000);
});