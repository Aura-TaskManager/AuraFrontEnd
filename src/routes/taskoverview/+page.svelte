<!-- src/routes/tasks/+page.svelte
vraagteken maakt het een soort van "nullable"
-->
<script>
	export let data;

	let tasks = data?.tasks;
</script>

<main>
	<h1>Task List</h1>
	{#if tasks.length > 0}
		<ul>
			{#each tasks as task}
				<li>{task.name} (ID: {task.taskId})</li>
			{/each}
		</ul>
	{:else}
		<p>No tasks found.</p>
	{/if}
</main>

<style>
    main {
        text-align: center;
        padding: 2em;
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
        color: #333;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        margin: 2em auto;
        border-radius: 8px;
    }

    h1 {
        color: #887ecb;
        font-size: 2.5em;
        margin-bottom: 0.5em;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0.75em 0;
        padding: 1em;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s, box-shadow 0.2s;
    }

    li:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    p {
        font-size: 1.2em;
        color: #777;
    }
</style>