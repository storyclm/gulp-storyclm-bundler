# Gulp v2.3
---
Gulp позволяет автоматизировать сборку проектов под различные clm-платформы. Данная версия отличается поддержкой ES6 синтаксиса, разбивкой тасок на модули. Часть тасок была переписана заново. Также, gulp был обновлен до версии 4. Это привнесло ряд полезных преимуществ, таких как например нативная поддержка последовательных и параллельных потоков. Дополнительно, были обновлены все версии используемых npm-пакетов.<br>
Ниже приведена инструкция по установке и настройке, а также работе с данным инструментом, в том числе какие таски и как их использовать использовать<br>


## Инструкция по установке с нуля:
---
1. [Скачать и установить последнюю LTS-версию Node.js](https://nodejs.org/en/)

2. Склонировать репозиторий
    ```
    git clone https://bitbucket.org/breffi/gulp-breffi
    ```

3. Перейти в ветку ```master```:
    ```
    git checkout master
    ```

4. Произвести установку необходимых модулей-зависимостей:
    ```
    npm install
    ```

## Инструкция по установке не с нуля (если была установлена предыдущая версия gulp):
---
1. Удалить папку ```gulp-breffi/``` из папки с git-проектами
    ```
    rm -rf gulp-breffi/
    ```

2. [Скачать и установить последнюю LTS-версию Node.js](https://nodejs.org/en/)

3. Склонировать репозиторий
    ```
    git clone https://bitbucket.org/breffi/gulp-breffi
    ```

4.  Перейти в ветку ```master```:
    ```
    git checkout master
    ```

5. Произвести установку необходимых модулей-зависимостей:
    ```
    npm install
    ```

## Комплексные таски:
---
* ```lint``` - линтер кода (html, css, js)
    ```
    gulp lint --project_folder/presentation_folder
    ```

* ```sync``` - Открывает доступ по порту (шаблон _StoryCLM_) и вешает watcher
    ```
    gulp sync --project_folder/presentation_folder
    ```

* ```seq-sync``` - Открывает доступ по порту (шаблон с _sequence_) и вешает watcher
    ```
    gulp seq-sync --project_folder/presentation_folder_with_sequences
    ```

* ```img_compress``` - Оптимизация картинок. сохраняем оптимизированные картинки в папке temp
    ```
    gulp img_compress --project_folder/presentation_folder
    ```

* ```minbuild``` - билдует без скриншотов для _StoryCLM_
    ```
    gulp minbuild --project_folder/presentation_folder
    ```

* ```build``` - билдует со скриншотами для _StoryCLM_
    ```
    gulp build --project_folder/presentation_folder
    ```

* ```communicate:build``` - билдует для _Communicate_
    ```
    gulp communicate:build --project_folder/presentation_folder
    ```

* ```mi:build``` - билдует один _sequence_ для _MI_
    ```
    gulp mi:build --project_folder/presentation_folder_with_sequences/sequence
    ```

* ```veeva:build``` - билдует один _sequence_ для _Veeva_
    ```
    gulp veeva:build --project_folder/presentation_folder_with_sequences/sequence
    ```

* ```build-zip``` - билдует и зипует пакет для _StoryCLM_
    ```
    gulp build-zip --project_folder/presentation_folder
    ```

* ```mi:build-zip``` - билдует и зипует один _sequence_ пакет для _MI_
    ```
    gulp mi:build-zip --project_folder/presentation_folder_with_sequences/sequence
    ```

* ```veeva:build-zip``` - билдует и зипует один _sequence_ пакет для _Veeva_
    ```
    gulp veeva:build-zip --project_folder/presentation_folder_with_sequences/sequence
    ```

* ```cm:build-zip``` - билдует и зипует пакет для _Communicate_
    ```
    gulp cm:build-zip --project_folder/presentation_folder
    ```

## Таски-модули:
---
* ```auto-zip``` - создание zip папки ```temp/```

* ```br``` - заменяет ```</br>``` на ```<br>```

* ```cm_files-build``` - копирует в папку ```temp/``` папки ```previews/```, ```resources/```, ```previewImage/```, ```slidesFolder/```

* ```css-lint``` - проверка css-файлов

* ```css-to-scss``` - делает scss файлы из css

* ```folders-zip``` - зипует все папки (секвенсы) в проекте по отдельности.

* ```fonts-build``` - копирует папку fonts в папку ```temp/```.

* ```html-build``` - клеит шаблоны, удаляет layer-0, добавляет версионность, копирует html файлы с версионностью в папку ```temp/```. _Падает, если не находит файл, подключенный в html._

* ```html-lint``` - проверка html-файлов

* ```image-build``` - копирует в папку ```temp/``` папки ```images/```, ```img/```

* ```image_2``` - оптимизация картинок в папке ```img/``` + отображает общую разницу в размере до и после

* ```image_classic``` - оптимизация картинок в папке ```images/``` + отображает общую разницу в размере до и после

* ```js-build``` - копирует папку ```js/``` в папку ```temp/```

* ```js-lint``` - проверка js-файлов

* ```jscpd``` - проверка дублирования js (минимум 10 одинаковых строк)

* ```json-build``` - копирует json-файлы в папку ```temp/```

* ```json-lint``` - проверка на валидность json-файлов

* ```media-build``` - копирует папку ```mediafiles/``` в папку temp

* ```mi_files-build```- копирует в папку ```temp/``` : ```media/```,  ```export/export.pdf```, ```parameters/parameters.xml```

* ```sass-watch``` - отслеживает изменения в scss-файлах и билдует из них css

* ```scss-to-css``` - делает css файлы из scss

* ```sequence-watch``` - Watcher папки проекта (шаблон с _sequence_)

* ```stock-watch``` - Watcher папки проекта (шаблон _StoryCLM_)

* ```style-build``` - проставляет префиксы в css, форматирует код и копирует папку ```css/``` в папку ```temp/```

* ```veeva_files-build``` - копирует в папку ```temp/``` превью

* ```webshot``` - делает скриншоты
