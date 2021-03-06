import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import CloseButton from "../img/close.svg";
// @ts-ignore
import SpoilersIcon from "../img/spoilers.svg";
// @ts-ignore
import ThreadIcon from "../img/thread.svg";

const logging = require("debug")("bobapost:embeds:utils");

export const addEmbedOverlay = (
  embedRoot: HTMLElement,
  callbacks: {
    onClose: (root: HTMLElement) => void;
    onMarkSpoilers?: (root: HTMLElement, spoilers: boolean) => void;
    onChangeThread?: (root: HTMLElement, thread: boolean) => void;
  },
  initialSettings?: {
    isSpoilers?: boolean;
    // TODO: make this configurable
    isThread?: boolean;
  }
) => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("embed-overlay");
  const closeButton = document.createElement("div");
  closeButton.classList.add("close-button");

  ReactDOM.render(React.createElement(CloseButton, {}, null), closeButton);
  containerDiv.appendChild(closeButton);
  closeButton.addEventListener("click", () => {
    callbacks.onClose(embedRoot);
  });

  // TODO: generalize this code
  if (callbacks.onMarkSpoilers || callbacks.onChangeThread) {
    const optionsOverlay = document.createElement("div");
    optionsOverlay.classList.add("options-overlay");
    if (callbacks.onMarkSpoilers) {
      const spoilersButton = document.createElement("div");
      spoilersButton.classList.add("spoilers-button", "embed-options-button");
      ReactDOM.render(
        React.createElement(SpoilersIcon, {}, null),
        spoilersButton
      );
      optionsOverlay.appendChild(spoilersButton);
      spoilersButton.classList.toggle("active", !!initialSettings?.isSpoilers);
      containerDiv.classList.toggle("spoilers", !!initialSettings?.isSpoilers);
      spoilersButton.addEventListener("click", (e) => {
        spoilersButton.classList.toggle("active");
        callbacks.onMarkSpoilers?.(
          embedRoot,
          spoilersButton.classList.contains("active")
        );
        containerDiv.classList.toggle(
          "spoilers",
          spoilersButton.classList.contains("active")
        );
        e.stopPropagation();
        e.preventDefault();
      });
    }
    if (callbacks.onChangeThread) {
      const threadButton = document.createElement("div");
      threadButton.classList.add("thread-button", "embed-options-button");
      ReactDOM.render(React.createElement(ThreadIcon, {}, null), threadButton);
      optionsOverlay.appendChild(threadButton);
      threadButton.classList.toggle("active", !!initialSettings?.isThread);
      threadButton.addEventListener("click", (e) => {
        threadButton.classList.toggle("active");
        callbacks.onChangeThread?.(
          embedRoot,
          threadButton.classList.contains("active")
        );
        e.stopPropagation();
        e.preventDefault();
      });
    }

    containerDiv.appendChild(optionsOverlay);
  }

  embedRoot.appendChild(containerDiv);
  return embedRoot;
};

export const addLoadingMessage = (
  embedRoot: HTMLElement,
  {
    color,
    message,
    url,
    width,
    height,
  }: {
    color?: string;
    message?: string;
    url: string;
    width?: string;
    height?: string;
  }
) => {
  const loadingMessage = document.createElement("div");
  const linkToOriginal = document.createElement("a");
  linkToOriginal.innerHTML = message || "Loading...";
  linkToOriginal.href = url;
  loadingMessage.appendChild(linkToOriginal);
  loadingMessage.classList.add("loading-message");
  if (color) {
    loadingMessage.style.backgroundColor = color;
  }
  if (width && height) {
    const ratio = (parseInt(height) / parseInt(width)) * 100;
    logging(ratio);
    loadingMessage.style.paddingTop = `${ratio}%`;
  }

  embedRoot.appendChild(loadingMessage);

  return embedRoot;
};

export const addErrorMessage = (
  embedRoot: HTMLElement,
  {
    message,
    url,
  }: {
    message: string;
    url: string;
  }
) => {
  const loadingMessage = document.createElement("div");
  const linkToOriginal = document.createElement("a");
  linkToOriginal.innerHTML = message;
  linkToOriginal.href = url;
  loadingMessage.appendChild(linkToOriginal);
  loadingMessage.classList.add("error-message");

  embedRoot.appendChild(loadingMessage);

  return embedRoot;
};
