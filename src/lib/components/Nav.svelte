<script lang="ts">
  import { navbar, type NavbarProps } from '../../stores';
  import { onDestroy } from 'svelte';

  import { page } from '$app/stores';
  import ThemeSelect from './ThemeSelect.svelte';

  import { isoDateWithinWeek } from '../../utils';

  let props: NavbarProps;

  const unsubscribe = navbar.subscribe((value) => (props = value));

  onDestroy(unsubscribe);
</script>

<div class="navbar h-20 fixed bg-base-300 py-2 shadow-md z-50">
  {#if props.start !== undefined}
    <div class="navbar-start">
      <a href={props.start.href} sveltekit:prefetch class="btn btn-ghost normal-case text-xl">
        {props.start.displayText}
      </a>
    </div>
  {/if}

  {#if Object.keys(props.links).length > 0}
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        {#each Object.values(props.links) as link, index}
          {#if link.children === undefined}
            <li class="mx-2" tabindex={index}>
              <a
                href={link.href}
                sveltekit:prefetch={link.prefetch}
                class:active={$page.url.pathname.startsWith(link.href)}
                class:font-bold={$page.url.pathname.startsWith(link.href)}
              >
                {link.displayText}
              </a>
            </li>
          {:else}
            <li class="mx-2" tabindex={index}>
              <a
                href={link.href}
                sveltekit:prefetch={link.prefetch}
                class:active={$page.url.pathname.startsWith(link.href)}
                class:font-bold={$page.url.pathname.startsWith(link.href)}
              >
                {link.displayText}
                <!-- TODO replace with wrapped icon -->
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>

              <ul class="p-2 bg-base-300 w-full">
                {#each link.children as child}
                  <li class="w-full" class:text-success={isoDateWithinWeek(child.displayText)}>
                    <a
                      href={child.href}
                      sveltekit:prefetch={child.prefetch}
                      class:active={$page.url.pathname.endsWith(child.href)}
                      class:font-bold={$page.url.pathname.endsWith(child.href)}
                    >
                      {child.displayText}
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  {/if}

  <div class="navbar-end">
    <ThemeSelect />
  </div>
</div>
