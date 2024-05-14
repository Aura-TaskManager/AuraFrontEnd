<script>
	import { onMount } from "svelte";

	let newTaskTitle = "";
	let newTaskDescription = "";
	let newTaskDueDate = "";
	let tasks = [];
	let showCompleted = false;
	let modalVisible = false;

	// Load tasks from localStorage
	onMount(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			tasks = JSON.parse(storedTasks);
		}
	});

	function addTask() {
		if (newTaskTitle.trim()) {
			const currentDate = new Date().toISOString().slice(0, 10); // Get current date
			tasks = [...tasks, {
				title: newTaskTitle,
				description: newTaskDescription,
				creationDate: currentDate,
				dueDate: newTaskDueDate,
				status: "todo"
			}];
			newTaskTitle = "";
			newTaskDescription = "";
			newTaskDueDate = "";
			saveTasks();
			closeModal(); // Close modal after adding task
		}
	}

	function moveTask(index, targetStatus) {
		tasks[index].status = targetStatus;
		saveTasks();
	}

	function deleteTask(index) {
		tasks = tasks.filter((_, i) => i !== index);
		saveTasks();
	}

	function saveTasks() {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	function toggleShowCompleted() {
		showCompleted = !showCompleted;
	}

	function openModal() {
		modalVisible = true;
	}

	function closeModal() {
		modalVisible = false;
	}
</script>

<style>
    main {
        font-family: "Trebuchet MS", Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
        color: #673AB7;
        text-align: center;
        margin-bottom: 20px;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
    }

    input[type="text"], textarea, input[type="date"] {
        width: calc(100% - 20px); /* Adjusted width */
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #673AB7;
        border-radius: 4px;
        font-size: 16px;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #673AB7;
        color: #fff;
        transition: background-color 0.3s ease;
        margin-top: 10px; /* Adjusted margin */
    }

    button:hover {
        background-color: #5E35B1;
    }

    .task-container {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .task-box {
        flex: 1;
        padding: 20px; /* Adjusted padding */
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin: 0 10px; /* Adjusted margin */
    }

    .task-box h2 {
        color: #673AB7;
        margin-bottom: 20px; /* Adjusted margin */
    }

    .task-list {
        list-style: none;
        padding: 0;
    }

    .task-list li {
        margin-bottom: 15px;
    }

    .task-item {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px; /* Adjusted padding */
    }

    .task-content {
        margin-bottom: 15px; /* Adjusted margin */
    }

    .task-options button {
        margin-right: 10px; /* Adjusted margin */
    }

    .option-button {
        padding: 8px 12px; /* Adjusted padding */
    }

    /* Modal Styles */
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
        border-radius: 8px;
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
</style>

<main>
	<h1>Welcome to Aura</h1>
	<div class="button-container">
		<button on:click={openModal}>Add Task</button>
	</div>

	<div class="task-container">
		<div class="task-box">
			<h2>To Do</h2>
			<ul class="task-list">
				{#each tasks.filter(task => task.status === "todo") as task, index}
					<li class="task-item">
						<div class="task-content">
							<span>{task.title}</span>
							<div>{task.description}</div>
							<div>Created on: {task.creationDate}</div>
							<div>Due date: {task.dueDate}</div>
							<div class="task-options">
								<button class="option-button" on:click={() => moveTask(index, 'doing')}>Start</button>
								<button class="option-button" on:click={() => deleteTask(index)}>Delete</button>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="task-box">
			<h2>Doing</h2>
			<ul class="task-list">
				{#each tasks.filter(task => task.status === "doing") as task, index}
					<li class="task-item">
						<div class="task-content">
							<span>{task.title}</span>
							<div>{task.description}</div>
							<div>Created on: {task.creationDate}</div>
							<div>Due date: {task.dueDate}</div>
							<div class="task-options">
								<button class="option-button" on:click={() => moveTask(index, 'todo')}>To Do</button>
								<button class="option-button" on:click={() => moveTask(index, 'done')}>Done</button>
								<button class="option-button" on:click={() => deleteTask(index)}>Delete</button>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="task-box">
			<h2>Done</h2>
			<ul class="task-list">
				{#each tasks.filter(task => task.status === "done") as task, index}
					<li class="task-item">
						<div class="task-content">
							<span>{task.title}</span>
							<div>{task.description}</div>
							<div>Created on: {task.creationDate}</div>
							<div>Due date: {task.dueDate}</div>
							<div class="task-options">
								<button class="option-button" on:click={() => moveTask(index, 'doing')}>Undo</button>
								<button class="option-button" on:click={() => deleteTask(index)}>Delete</button>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Add Task Modal -->
	<div class="modal" style="display: {modalVisible ? 'block' : 'none'}">
		<div class="modal-content">
			<span class="close" on:click={closeModal}>&times;</span>
			<h2>Add New Task</h2>
			<input type="text" placeholder="Title" bind:value={newTaskTitle}>
			<textarea placeholder="Description" bind:value={newTaskDescription}></textarea>
			<input type="date" bind:value={newTaskDueDate}>
			<button on:click={addTask}>Add Task</button>
		</div>
	</div>
</main>