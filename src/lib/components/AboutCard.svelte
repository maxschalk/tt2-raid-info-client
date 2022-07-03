<script lang="ts">
  export let imgSrc: string | undefined = undefined;
  export let imgAlt: string | undefined = undefined;
  export let links: { text: string; href: string }[] = [];

  export let classes: string[] = [];

  const linkVariants = ['primary', 'secondary', 'accent', 'ghost'];
</script>

<div class={`card lg:card-side bg-base-200 shadow-lg ${classes.join(' ')}`}>
  <div class="card-body space-y-4">
    <h2 class="card-title"><slot name="title" /></h2>
    <p>
      <slot name="body" />
    </p>

    {#if links.length > 0}
      <div class="card-actions justify-start">
        {#each links as link, index}
          <a
            href={link.href}
            target="_blank"
            class={`btn btn-${linkVariants[index % linkVariants.length]}`}
          >
            {link.text}
          </a>
        {/each}
      </div>
    {/if}
  </div>

  {#if imgSrc !== undefined}
    <figure class="bg-base-300 p-4">
      <img src={imgSrc} alt={imgAlt} class="w-20" />
    </figure>
  {/if}
</div>
