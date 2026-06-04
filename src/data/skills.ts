export interface Skill {
  name: string;
  url: string;
}

export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "Android", url: "https://developer.android.com/" },
      { name: "iOS", url: "https://developer.apple.com/ios/" },
      { name: "React.js", url: "https://react.dev/" },
      { name: "Flutter", url: "https://flutter.dev/" },
      { name: "KMP", url: "https://www.jetbrains.com/kotlin-multiplatform/" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", url: "https://nodejs.org/" },
      { name: "AppEngine", url: "https://cloud.google.com/appengine" },
      { name: "AWS", url: "https://aws.amazon.com/" },
      { name: "Cloud Functions", url: "https://cloud.google.com/functions" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Java", url: "https://dev.java/" },
      { name: "Kotlin", url: "https://kotlinlang.org/" },
      { name: "Swift", url: "https://developer.apple.com/swift/" },
      {
        name: "JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "SQLite", url: "https://www.sqlite.org/" },
      { name: "Realm", url: "https://realm.io/" },
      {
        name: "CoreData",
        url: "https://developer.apple.com/documentation/coredata",
      },
      { name: "MongoDB", url: "https://www.mongodb.com/" },
    ],
  },
  {
    title: "AI",
    skills: [
      {
        name: "RAG",
        url: "https://aws.amazon.com/what-is/retrieval-augmented-generation/",
      },
      { name: "OpenRouter", url: "https://openrouter.ai/" },
      { name: "Claude", url: "https://claude.ai/" },
      { name: "Codex", url: "https://openai.com/blog/openai-codex" },
      { name: "Github Copilot", url: "https://github.com/features/copilot" },
    ],
  },
];

export const toolsAndOthers: Skill[] = [
  { name: "Git", url: "https://git-scm.com/" },
  { name: "CI/CD", url: "https://en.wikipedia.org/wiki/CI/CD" },
  { name: "AOSP", url: "https://source.android.com/" },
  { name: "REST APIs", url: "https://restfulapi.net/" },
  { name: "GraphQL", url: "https://graphql.org/" },
  { name: "Docker", url: "https://www.docker.com/" },
  { name: "Linux", url: "https://www.linux.org/" },
  { name: "Agile", url: "https://agilemanifesto.org/" },
];
