import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function DragDrop() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('a leitura do arquivo foi abortada')
      reader.onerror = () => console.log('a leitura do arquivo falhou')
      reader.onload = () => {
      // Faça o que quiser com o conteúdo do arquivo
      // <img src={require('../assets/img/'+file.name)} alt="imagem" />
    }
    reader.readAsArrayBuffer(file)
  })
    
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Largue os arquivos aqui...</p> :
          <p>Arraste e solte alguns arquivos aqui ou clique para selecionar os arquivos</p>
      }
    </div>
  )
}

export default DragDrop
