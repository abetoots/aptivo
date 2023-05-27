//TODO optimizations , documentation
//TODO find a way to simply provide an option to 'exposeChildStyles: true' instead of manually adding it on the top level
//https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${NestedKeyOf<ObjectType[Key]>}` // don't return first level key
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type ExposeStylesProps = {
  merge?: Record<string, string>;
  replace?: Record<string, string>;
};
export const exposeStyles = <T extends ExposeStylesProps>({
  merge,
  replace,
}: T) => {
  const keysRef = new Set();
  const mergeKeys: Record<string, boolean> = {};
  const replaceKeys: Record<string, boolean> = {};
  let tempObj = {} as Record<NestedKeyOf<T>, string>;

  if (merge || replace) {
    //separate merge and replace keys, throw if a duplicate is found
    if (merge) {
      //merge keys
      Object.keys(merge).forEach((key) => {
        if (keysRef.has(key)) {
          throw new Error(
            `@Shared/api/styles: Duplicate key. You can't merge and replace the same key: ${key}. `
          );
        }
        mergeKeys[key] = true;
        keysRef.add(key);
      });
      //no duplicates were found, merge to return obj
      tempObj = { ...tempObj, ...merge };
    }

    if (replace) {
      //replace keys
      Object.keys(replace).forEach((key) => {
        if (keysRef.has(key)) {
          throw new Error(
            `@Shared/api/styles: Duplicate key. You can't merge and replace the same key: ${key}. `
          );
        }
        replaceKeys[key] = true;
        keysRef.add(key);
      });
      tempObj = { ...tempObj, ...replace };
    }
  } else {
    throw new Error(`@Shared/api/styles: No merge or replace keys were found.`);
  }

  return (
    props: React.PropsWithChildren<{
      classes?: Partial<Record<NestedKeyOf<T>, string>>;
    }>
  ): Record<NestedKeyOf<T>, string> => {
    const returnObj = { ...tempObj };

    const { classes } = props;

    if (classes) {
      for (const [key, val] of Object.entries(classes)) {
        const k = key as NestedKeyOf<T>;
        if (mergeKeys[key] && merge) {
          const oldVal = merge[key] as string;
          const newVal = val as string;
          //merge classnames
          if (newVal) {
            returnObj[k] = oldVal ? `${oldVal} ${newVal}` : newVal; //merge by appending the class
          }
        } else if (replaceKeys[key] && replace) {
          const oldVal = replace[key] as string;
          const newVal = val as string;
          //replace classnames\
          returnObj[k] = newVal ? newVal : oldVal; //replace the class, not merge
        } else {
          if (process.env.NODE_ENV !== "production") {
            console.error(`@Shared/api/styles: the key ${key} provided to the classes prop is not implemented in this component.
                You can only override one of the following: ${Array.from(
                  keysRef
                ).join()}.`);
          }
        }
      } //end for loop
    } //end if classes

    return returnObj;
  };
};
