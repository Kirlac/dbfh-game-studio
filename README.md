# The Desert Bus for Hope Game Studio

A common element of the Desert Bus for Hope charity livestream event is viewers submitting quizzes and games for the hosts to play on air. One of the biggest problems with this is that doing so requires viewers to create these from scratch or from templates they share with each other, often in the form of a google docs slideshow (or similar) which they then send to the Desert Bus team. The result is a very inconsistent experience with different layouts and visual issues which can cause problems on stream, such as things not loading correctly or stream overlay elements covering up important parts of the game. Additionally, because of the formats used, these usually offer little-to-no interactivity and limited scoring capabilities for tracking answers.

This project exists as an attempt to create a unified solution designed with solutions to these problems in mind. A web application where users can create quizzes and games by filling in fields in a simple form. They can then produce a share code, either as a text string which can be copy/pasted or in the form of a downloadable file (which is effectively just a text file containing the same string). These share codes can then be input back into the application to play the games with a consistent feature set, layout and visual design.

## Status

The application currently has a functional framework providing the application layout as well as a set of different themes: a Desert Bus theme based on the [Desert Bus website](https://desertbus.org) and five themes based on each of the Desert Bus shift banners (Dawn Guard, Alpha Flight, Night Watch, Zeta Shift and Omega Shift).

An Information Centre can be accessed by clicking the (?) button in the top right, or by pressing the 'i' key on your keyboard. This will provide help and configuration for the application and includes settings with a theme selector and the option to toggle cursive italic code fonts (for extra fanciness), a list of all currently implemented keyboard shortcuts, some example games to copy or download and a credits section with contact information.

The "This or That" game editor is a work in progress but is nearing completion. The other games only have an empty placeholder page at this time. There is a placeholder page for the game player, but it has no functionality and just displays the JSON representation of the currently loaded game.

## Technology

This project is being developed with [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) using [TypeScript](https://www.typescriptlang.org/). It includes [tailwindcss](https://tailwindcss.com/) for styles, the free version of [Font Awesome](https://fontawesome.com/) for icons and the [Cascadia Code](https://github.com/microsoft/cascadia-code) font for code representations.

There are no APIs or databases. All data is handled in memory as JSON objects. All persistence (such as user configurations) is implemented using the web browser's localstorage functionality.

This project does not rely on any third party websites or services and uses. It will never track you. There are no analytics or metrics being collected. There is no social media integration. It is intended to be lightweight, usable and most importantly respectful of the users and their privacy.

The only links to third party services are the clearly labelled links in the Contact section of the Information Centre. They exist solely to give users a convenient way back to this repository (for filing issues and suggestions) and to my (mostly unused) mastodon account on [kind.social](https://kind.social) if they wish to contact me directly. Additionally, two links are provided to [desertbus.org](https://desertbus.org/) and the [@desertbus@kind.social](https://kind.social/@desertbus) mastodon account to credit the organizers for the event, as without them this project would not exist.

The published version of this app is being hosted on [Vercel](https://vercel.com/) using a free Hobby tier account.

## License

This project is currently unlicensed, meaning it is NOT open source. This is merely a temporary situation during the initial development phase, as the main focus is currently on getting a functional system up an running.

When this project gets closer to completion and opens up for testing and feedback, I will also take the time to review license options and transition it to an open source project which people can contribute to or fork for their own purposes.

## Contributions

Bug reports and suggestions are welcome using the GitHub issues system.

The application will be open sourced when it's closer to completion, at which point code contributions will also be welcome.

Development and compilation instructions, coding standards/guidelines and contribution guidance will be provided when the project is transitioned to open source.

## Notes

This readme will be updated over time to reflect the current state of the project and provide some basic documentation.

This project is a non-commercial work created voluntarily. It is not and will never be for profit. Financial donations towards development will never be accepted. If you wish to show your support financially, I ask that you please instead donate to a charitable foundation such as [Child's Play](https://www.childsplaycharity.org/) (either directly or via the next Desert Bus for Hope event) which is the foundation Desert Bus raises money for.
