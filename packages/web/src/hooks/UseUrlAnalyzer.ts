export type UseUrlAnalyzer = {
  validate: (url: string) => boolean;
  getCode: (url: string) => string | null;
  hasFoundCode: (url: string) => boolean;
};

export function useUrlAnalyzer(): UseUrlAnalyzer {
  function validate(url: string): boolean {
    const regex = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gim
    );
    return regex.test(url);
  }
  
  function getCode(url: string): string | null {
    const regex = /\/code\/[a-zA-Z0-9]{6}\/?$/;
    const match = url.match(regex);
  
    if (match) {
      const code = match[0].replace(/\/code\/|\/$/g, '');
      return code;
    } else {
      return null;
    }
  }

  function hasFoundCode(url: string): boolean {
    return !!getCode(url);
  }

  return {
    validate,
    getCode,
    hasFoundCode
  }
}