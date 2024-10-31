import { createContext, useState } from "react";

type AddCardContextType = {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  adding: boolean
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
}
interface Props {
  children: React.ReactNode
}

export const AddCardContext = createContext<AddCardContextType>({} as AddCardContextType);

export const AddCardContextProvider: React.FC<Props> = ({ children }) => {

  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);

  const values: AddCardContextType = {text, setText, adding, setAdding};
  
  return (
    <AddCardContext.Provider value={values}>
      {children}
    </AddCardContext.Provider>
  )
}

