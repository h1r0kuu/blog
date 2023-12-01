import { createContext, Dispatch, FC, ReactElement, ReactNode, SetStateAction, useState } from "react"

type TitleContextType = {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
}

export const TitleContext = createContext<TitleContextType>({} as TitleContextType)

type ProviderProps = {
  children: ReactNode
}

const TitleContextProvider: FC<ProviderProps> = ({ children }): ReactElement => {
  const [title, setTitle] = useState("")
  document.title = title
  return <TitleContext.Provider value={{ title, setTitle }}>{children}</TitleContext.Provider>
}

export default TitleContextProvider
