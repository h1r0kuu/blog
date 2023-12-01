import {createContext, FC, ReactElement, ReactNode, useState} from "react";

type TitleContextType = {
    title: string,
    setTitle: (title: string) => void
}

export const TitleContext = createContext<TitleContextType>({} as TitleContextType)

type ProviderProps = {
    children: ReactNode
}

const TitleContextProvider: FC<ProviderProps> = ({ children }): ReactElement => {
    const [title, setTitle] = useState("");

    return (
        <TitleContext.Provider value={{ title, setTitle }}>
            {children}
        </TitleContext.Provider>
    )
}

export default TitleContextProvider