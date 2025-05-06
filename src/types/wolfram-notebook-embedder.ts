declare module "wolfram-notebook-embedder" {
  export interface NotebookGetCellContentParameters {
    /**
     * cellId ID of the cell to read.
     */
    cellId: string;
  }
  export interface NotebookGetCellExpressionParameters {
    /**
     * cellId ID of the cell to read.
     */
    cellId: string;
    /**
     * Whether to convert any dynamic content to literal values. [Cloud 1.56, experimental]
     */
    convertDynamicToLiteral?: boolean;
  }
  export interface NotebookGetElementParameters {
    /**
     * ID of the cell group. If the parameter is omitted or falsy (e.g. null or ""), the top-level elements in the notebook are returned.
     */
    groupId?: string;
  }
  export interface NotebookGetElementResponse {
    /**
     * List of elements in the cell group, in the order they appear in the notebook.
     */
    elements: Array<{ type: "cell" | "group"; id: string }>;
    /**
     * Whether the cell group is closed.
     */
    isClosed: boolean;
    /**
     * Index (0-based) of the visible element in case the cell group is closed. null if the group is not closed.
     */
    visibleElementIndex?: number;
  }
  export interface Notebook {
    /**
     * Gets the textual content of a cell.
     * @return The textual content of the cell.
     * @throws "CellNotFound" - The cell ID given by `cellId` was not found.
     */
    getCellContent(parameters: NotebookGetCellContentParameters): string;
    /**
     * Gets the contents of a cell as an expression. [Cloud 1.55]
     * @return The content of the cell.
     * @throws "CellNotFound" - The cell ID given by `cellId` was not found.
     */
    getCellExpression(parameters: NotebookGetCellExpressionParameters): unknown;
    /**
     * Retrieves the (top-level) elements in the notebook or a cell group.
     * @throws "GroupNotFound" — The group specified by groupId was not found.
     */
    getElements(
      parameters: NotebookGetElementParameters,
    ): NotebookGetElementResponse;
    /* TODO: ... */
    /**
     * changes embedding attributes (except for allowInteract and useShadowDOM, which cannot be changed dynamically)
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO
    setAttributes(options: any): void;
    /**
     * call this function when the embedded notebook is no longer needed, e.g. because the node it is embedded in disappears
     */
    detach(): void;
    /**
     * registers an event listener
     */
    addEventListener(eventName: string, callback: () => void): void;
    /**
     * unregisters an event listener
     */
    removeEventListener(eventName: string, callback: () => void): void;
  }

  export interface EmbedAttributes {
    /**
     * width of the notebook in pixels; a value of null (the default) makes the notebook adapt to the width of the container node
     */
    width?: number;
    /**
     * maximum height of the notebook in pixels; a value of Infinity (the default) allows the notebook to grow infinitely; a value of null makes the notebook adapt to the height of the container node
     */
    maxHeight?: number;
    /**
     * whether to enable interactivity in the notebook, which might use the server-side Wolfram Engine for computations; even if this is set to true (the default), the Permissions of the cloud notebook must also include All -> {"Read", "Interact"} for interactions to actually work
     */
    allowInteract?: boolean;
    /**
     * whether to show the render progress indicator at the top of the notebook during the initial loading phase (see Notebook Loading Phases for more information); the default is true
     */
    showRenderProgress?: boolean;
    /**
     * (experimental) whether to use a shadow DOM container for the notebook; the default is false (but might change in a future release after 0.2.x)
     */
    useShadowDOM?: boolean;
  }

  /**
   * @param notebookUrl a string with a cloud object URL of the notebook to embed, e.g. 'https://www.wolframcloud.com/obj/4beadfbb-84dd-4b26-87b6-bcd30b9abd65' or 'https://www.wolframcloud.com/obj/myusername/myfolder/mynotebook.nb'
   * @param domNode a DOM node in which to render the notebook, e.g. obtained by document.getElementById('myContainer')
   * @param attributes a JavaScript object with attributes
   */
  export function embed(
    notebookURL: string,
    domNode: Node,
    attributes?: EmbedAttributes,
  ): Promise<Notebook>;
}
